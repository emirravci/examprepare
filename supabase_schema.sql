-- ==============================================================================
-- ZİRAAT BANKASI UZMAN YARDIMCILIĞI SINAV HAZIRLIK UYGULAMASI
-- GÜNCEL SUPABASE VERİTABANI ŞEMASI (MASTER DDL SCRIPT)
-- Son Güncelleme: 8 Ekim 2026
-- ==============================================================================

-- 1. PROFILES (Kullanıcı Profilleri & Genel Ayarlar)
create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name text,
    avatar_url text,
    target_exam text default 'Ziraat Bankası Uzman Yrd. (BT / Bilgisayar Müh.)',
    target_date date default '2026-10-24',
    streak_count int default 0,
    last_active_date date,
    settings jsonb default '{"darkMode": true, "showTimer": true, "netPenalty": false}'::jsonb,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Kullanıcı kendi profilini görüntüleyebilir"
    on public.profiles for select
    using (auth.uid() = id);

create policy "Kullanıcı kendi profilini oluşturabilir"
    on public.profiles for insert
    with check (auth.uid() = id);

create policy "Kullanıcı kendi profilini güncelleyebilir"
    on public.profiles for update
    using (auth.uid() = id);

-- 2. QUESTIONS (Soru Havuzu - Çoktan Seçmeli Sorular)
create table if not exists public.questions (
    id text primary key,
    section text not null check (section in ('genel-kultur', 'genel-yetenek', 'ingilizce', 'alan')),
    topic text not null,
    subtopic text,
    difficulty int not null check (difficulty in (1, 2, 3)), -- 1: Kolay, 2: Orta, 3: Zor
    stem text not null, -- Soru kökü (Markdown & Kod blokları destekli)
    options jsonb not null, -- 5 seçenek (A, B, C, D, E)
    answer_index int not null check (answer_index between 0 and 4),
    explanation text not null, -- Neden doğru, çeldiriciler neden yanlış
    tags text[] default array[]::text[],
    source text default 'original' check (source in ('original', 'user')),
    created_at timestamptz default now() not null
);

-- Soru tablosunu herkes okuyabilir (genel soru bankası), kullanıcılar sadece kendi eklediklerini düzenleyebilir
alter table public.questions enable row level security;

create policy "Tüm kullanıcılar soruları okuyabilir"
    on public.questions for select
    using (true);

create policy "Giriş yapmış kullanıcılar soru ekleyebilir"
    on public.questions for insert
    with check (auth.role() = 'authenticated');

create index if not exists idx_questions_section on public.questions(section);
create index if not exists idx_questions_topic on public.questions(topic);
create index if not exists idx_questions_difficulty on public.questions(difficulty);

-- 3. ATTEMPTS (Deneme ve Alıştırma Oturumları)
create table if not exists public.attempts (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    mode text not null check (mode in ('practice', 'exam')),
    started_at timestamptz default now() not null,
    finished_at timestamptz,
    duration_seconds int default 0,
    total_questions int not null default 0,
    
    -- Genel Sonuçlar
    total_correct int default 0,
    total_wrong int default 0,
    total_empty int default 0,
    total_score numeric(5,2) default 0,
    
    -- Bölüm 1: GY-GK (60 Soru, Baraj: >= 36)
    gy_gk_correct int default 0,
    gy_gk_wrong int default 0,
    gy_gk_empty int default 0,
    gy_gk_passed boolean default false,
    
    -- Bölüm 2: İngilizce (40 Soru, Baraj: >= 24)
    english_correct int default 0,
    english_wrong int default 0,
    english_empty int default 0,
    english_passed boolean default false,
    
    -- Bölüm 3: Alan (40 Soru, Baraj: >= 20)
    alan_correct int default 0,
    alan_wrong int default 0,
    alan_empty int default 0,
    alan_passed boolean default false,
    
    -- Genel Baraj & Mülakat Durumu
    is_all_passed boolean default false,
    
    -- Detaylı cevap kayıtları: [{ questionId, chosen, isCorrect, flagged, timeMs }]
    answers_data jsonb default '[]'::jsonb not null
);

alter table public.attempts enable row level security;

create policy "Kullanıcı kendi sınav girişimlerini görebilir"
    on public.attempts for select
    using (auth.uid() = user_id);

create policy "Kullanıcı kendi sınav girişimlerini kaydedebilir"
    on public.attempts for insert
    with check (auth.uid() = user_id);

create policy "Kullanıcı kendi sınav girişimlerini güncelleyebilir"
    on public.attempts for update
    using (auth.uid() = user_id);

create policy "Kullanıcı kendi sınav girişimlerini silebilir"
    on public.attempts for delete
    using (auth.uid() = user_id);

create index if not exists idx_attempts_user on public.attempts(user_id);
create index if not exists idx_attempts_mode on public.attempts(mode);
create index if not exists idx_attempts_started on public.attempts(started_at desc);

-- 4. USER_REVIEWS (Yanlış Defteri & Leitner / Aralıklı Tekrar)
create table if not exists public.user_reviews (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    question_id text not null references public.questions(id) on delete cascade,
    box int default 1 check (box between 1 and 5), -- Leitner kutusu 1..5
    due_at timestamptz default now() not null,
    wrong_count int default 1,
    correct_count int default 0,
    last_reviewed_at timestamptz default now() not null,
    user_notes text,
    constraint unique_user_question_review unique (user_id, question_id)
);

alter table public.user_reviews enable row level security;

create policy "Kullanıcı kendi yanlış defterini görebilir"
    on public.user_reviews for select
    using (auth.uid() = user_id);

create policy "Kullanıcı kendi yanlış defterine ekleme yapabilir"
    on public.user_reviews for insert
    with check (auth.uid() = user_id);

create policy "Kullanıcı kendi yanlış defterini güncelleyebilir"
    on public.user_reviews for update
    using (auth.uid() = user_id);

create policy "Kullanıcı kendi yanlış defterinden silebilir"
    on public.user_reviews for delete
    using (auth.uid() = user_id);

create index if not exists idx_reviews_user_due on public.user_reviews(user_id, due_at);

-- 5. FLASHCARDS (Kavram ve Kelime Kartları)
create table if not exists public.flashcards (
    id text primary key,
    category text not null check (category in ('alan', 'ingilizce', 'genel-kultur')),
    topic text not null,
    front text not null,
    back text not null,
    tags text[] default array[]::text[],
    created_at timestamptz default now() not null
);

alter table public.flashcards enable row level security;

create policy "Herkes flashcardları görüntüleyebilir"
    on public.flashcards for select
    using (true);

-- Kullanıcı kart ilerlemesi (Biliyorum / Tekrar)
create table if not exists public.user_flashcard_progress (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    flashcard_id text not null references public.flashcards(id) on delete cascade,
    status text not null check (status in ('known', 'learning', 'again')),
    reviewed_at timestamptz default now() not null,
    constraint unique_user_flashcard unique (user_id, flashcard_id)
);

alter table public.user_flashcard_progress enable row level security;

create policy "Kullanıcı kendi kart ilerlemesini yönetebilir"
    on public.user_flashcard_progress for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- 6. OTOMATİK PROFİL OLUŞTURMA TRİGGERI (Auth -> Profiles)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ==============================================================================
-- ŞEMA TAMAMLANDI.
-- ==============================================================================
