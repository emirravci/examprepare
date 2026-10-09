const fs = require('fs');
const path = require('path');

function esc(val) {
    if (val === null || val === undefined) return 'NULL';
    return "'" + String(val).replace(/'/g, "''") + "'";
}

function escArray(arr) {
    if (!arr || !Array.isArray(arr) || arr.length === 0) return "ARRAY[]::text[]";
    const items = arr.map(item => "'" + String(item).replace(/'/g, "''") + "'");
    return "ARRAY[" + items.join(', ') + "]::text[]";
}

function escJson(obj) {
    if (!obj) return "'[]'::jsonb";
    return "'" + JSON.stringify(obj).replace(/'/g, "''") + "'::jsonb";
}

// 1. DATA FILES
const bgk = JSON.parse(fs.readFileSync('data/questions/bankacilik_genel_kultur.json', 'utf8'));
const orn = JSON.parse(fs.readFileSync('data/questions/oruntu_analitik.json', 'utf8'));
const eng = JSON.parse(fs.readFileSync('data/questions/ingilizce.json', 'utf8'));
const alan = JSON.parse(fs.readFileSync('data/questions/alan_bilgisayar.json', 'utf8'));
const allQuestions = [...bgk, ...orn, ...eng, ...alan];

const lectures = JSON.parse(fs.readFileSync('data/lectures.json', 'utf8'));
const flashcards = JSON.parse(fs.readFileSync('data/flashcards.json', 'utf8'));
const resources = JSON.parse(fs.readFileSync('data/external_resources.json', 'utf8'));

console.log(`Loaded: ${allQuestions.length} questions, ${lectures.length} lectures, ${flashcards.length} flashcards, ${resources.length} resources.`);

// 2. DDL SCRIPT (SCHEMA)
const schemaSql = `-- ==============================================================================
-- ZİRAAT BANKASI UZMAN / MÜFETTİŞ YARDIMCILIĞI SINAV HAZIRLIK UYGULAMASI
-- GÜNCEL SUPABASE VERİTABANI ŞEMASI (MASTER DDL SCRIPT)
-- Son Güncelleme: 9 Ekim 2026 (Tam İdempotent Sürüm - Notlar, Videolar ve Tüm Modüller Dahil)
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

drop policy if exists "Kullanıcı kendi profilini görüntüleyebilir" on public.profiles;
create policy "Kullanıcı kendi profilini görüntüleyebilir"
    on public.profiles for select using (auth.uid() = id);

drop policy if exists "Kullanıcı kendi profilini oluşturabilir" on public.profiles;
create policy "Kullanıcı kendi profilini oluşturabilir"
    on public.profiles for insert with check (auth.uid() = id);

drop policy if exists "Kullanıcı kendi profilini güncelleyebilir" on public.profiles;
create policy "Kullanıcı kendi profilini güncelleyebilir"
    on public.profiles for update using (auth.uid() = id);

-- 2. QUESTIONS (Soru Havuzu - Çoktan Seçmeli Sorular)
create table if not exists public.questions (
    id text primary key,
    section text not null check (section in ('genel-kultur', 'genel-yetenek', 'bankacilik-genel-kultur', 'oruntu-analitik', 'ingilizce', 'alan')),
    topic text not null,
    subtopic text,
    difficulty int not null default 2 check (difficulty in (1, 2, 3)),
    stem text not null,
    options jsonb not null,
    answer_index int not null check (answer_index between 0 and 4),
    explanation text not null,
    tags text[] default array[]::text[],
    source text default 'original',
    created_at timestamptz default now() not null
);

alter table public.questions enable row level security;

drop policy if exists "Tüm kullanıcılar soruları okuyabilir" on public.questions;
create policy "Tüm kullanıcılar soruları okuyabilir"
    on public.questions for select using (true);

drop policy if exists "Giriş yapmış kullanıcılar soru ekleyebilir veya güncelleyebilir" on public.questions;
create policy "Giriş yapmış kullanıcılar soru ekleyebilir veya güncelleyebilir"
    on public.questions for all with check (auth.role() = 'authenticated');

create index if not exists idx_questions_section on public.questions(section);
create index if not exists idx_questions_topic on public.questions(topic);
create index if not exists idx_questions_difficulty on public.questions(difficulty);

-- Mevcut tablolardaki eski kısıtlamaları kaldır ve güncelle (Migration)
alter table if exists public.questions drop constraint if exists questions_section_check;
alter table if exists public.questions drop constraint if exists questions_source_check;
alter table if exists public.questions add constraint questions_section_check 
    check (section in ('genel-kultur', 'genel-yetenek', 'bankacilik-genel-kultur', 'oruntu-analitik', 'ingilizce', 'alan'));

-- 3. ATTEMPTS (Deneme ve Alıştırma Oturumları)
create table if not exists public.attempts (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    mode text not null check (mode in ('practice', 'exam')),
    started_at timestamptz default now() not null,
    finished_at timestamptz,
    duration_seconds int default 0,
    total_questions int not null default 0,
    
    total_correct int default 0,
    total_wrong int default 0,
    total_empty int default 0,
    total_score numeric(5,2) default 0,
    
    gy_gk_correct int default 0,
    gy_gk_wrong int default 0,
    gy_gk_empty int default 0,
    gy_gk_passed boolean default false,
    
    english_correct int default 0,
    english_wrong int default 0,
    english_empty int default 0,
    english_passed boolean default false,
    
    alan_correct int default 0,
    alan_wrong int default 0,
    alan_empty int default 0,
    alan_passed boolean default false,
    
    is_all_passed boolean default false,
    answers_data jsonb default '[]'::jsonb not null
);

alter table public.attempts enable row level security;

drop policy if exists "Kullanıcı kendi sınav girişimlerini görebilir" on public.attempts;
create policy "Kullanıcı kendi sınav girişimlerini görebilir"
    on public.attempts for select using (auth.uid() = user_id);

drop policy if exists "Kullanıcı kendi sınav girişimlerini kaydedebilir" on public.attempts;
create policy "Kullanıcı kendi sınav girişimlerini kaydedebilir"
    on public.attempts for insert with check (auth.uid() = user_id);

drop policy if exists "Kullanıcı kendi sınav girişimlerini güncelleyebilir" on public.attempts;
create policy "Kullanıcı kendi sınav girişimlerini güncelleyebilir"
    on public.attempts for update using (auth.uid() = user_id);

drop policy if exists "Kullanıcı kendi sınav girişimlerini silebilir" on public.attempts;
create policy "Kullanıcı kendi sınav girişimlerini silebilir"
    on public.attempts for delete using (auth.uid() = user_id);

create index if not exists idx_attempts_user on public.attempts(user_id);
create index if not exists idx_attempts_mode on public.attempts(mode);
create index if not exists idx_attempts_started on public.attempts(started_at desc);

-- 4. USER_REVIEWS (Yanlış Defteri & Leitner / Aralıklı Tekrar)
create table if not exists public.user_reviews (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    question_id text not null references public.questions(id) on delete cascade,
    box int default 1 check (box between 1 and 5),
    due_at timestamptz default now() not null,
    wrong_count int default 1,
    correct_count int default 0,
    last_reviewed_at timestamptz default now() not null,
    user_notes text,
    constraint unique_user_question_review unique (user_id, question_id)
);

alter table public.user_reviews enable row level security;

drop policy if exists "Kullanıcı kendi yanlış defterini görebilir" on public.user_reviews;
create policy "Kullanıcı kendi yanlış defterini görebilir"
    on public.user_reviews for select using (auth.uid() = user_id);

drop policy if exists "Kullanıcı kendi yanlış defterine ekleme yapabilir" on public.user_reviews;
create policy "Kullanıcı kendi yanlış defterine ekleme yapabilir"
    on public.user_reviews for insert with check (auth.uid() = user_id);

drop policy if exists "Kullanıcı kendi yanlış defterini güncelleyebilir" on public.user_reviews;
create policy "Kullanıcı kendi yanlış defterini güncelleyebilir"
    on public.user_reviews for update using (auth.uid() = user_id);

drop policy if exists "Kullanıcı kendi yanlış defterinden silebilir" on public.user_reviews;
create policy "Kullanıcı kendi yanlış defterinden silebilir"
    on public.user_reviews for delete using (auth.uid() = user_id);

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

drop policy if exists "Herkes flashcardları görüntüleyebilir" on public.flashcards;
create policy "Herkes flashcardları görüntüleyebilir"
    on public.flashcards for select using (true);

drop policy if exists "Yetkili kullanıcılar flashcard ekleyebilir" on public.flashcards;
create policy "Yetkili kullanıcılar flashcard ekleyebilir"
    on public.flashcards for all with check (auth.role() = 'authenticated');

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

drop policy if exists "Kullanıcı kendi kart ilerlemesini yönetebilir" on public.user_flashcard_progress;
create policy "Kullanıcı kendi kart ilerlemesini yönetebilir"
    on public.user_flashcard_progress for all
    using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 6. LECTURES (Konu Anlatımları ve Hap Notlar)
create table if not exists public.lectures (
    id text primary key,
    section text not null check (section in ('alan', 'genel-kultur', 'genel-yetenek', 'bankacilik-genel-kultur', 'oruntu-analitik', 'ingilizce')),
    topic text not null,
    title text not null,
    read_time text,
    summary text,
    content text not null,
    created_at timestamptz default now() not null
);

alter table public.lectures enable row level security;

drop policy if exists "Herkes konu anlatımlarını okuyabilir" on public.lectures;
create policy "Herkes konu anlatımlarını okuyabilir"
    on public.lectures for select using (true);

drop policy if exists "Yetkili kullanıcılar konu anlatımı ekleyebilir" on public.lectures;
create policy "Yetkili kullanıcılar konu anlatımı ekleyebilir"
    on public.lectures for all with check (auth.role() = 'authenticated');

-- Kullanıcı konu çalışma ilerlemesi (Okundu / Yer imi)
create table if not exists public.user_lecture_progress (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    lecture_id text not null references public.lectures(id) on delete cascade,
    is_completed boolean default false,
    bookmarked boolean default false,
    completed_at timestamptz,
    constraint unique_user_lecture unique (user_id, lecture_id)
);

alter table public.user_lecture_progress enable row level security;

drop policy if exists "Kullanıcı kendi konu ilerlemesini yönetebilir" on public.user_lecture_progress;
create policy "Kullanıcı kendi konu ilerlemesini yönetebilir"
    on public.user_lecture_progress for all
    using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Mevcut konu tablosundaki eski kısıtlamaları güncelle (Migration)
alter table if exists public.lectures drop constraint if exists lectures_section_check;
alter table if exists public.lectures add constraint lectures_section_check 
    check (section in ('alan', 'genel-kultur', 'genel-yetenek', 'bankacilik-genel-kultur', 'oruntu-analitik', 'ingilizce'));

-- 7. EXTERNAL RESOURCES (Harici Video, ALES/DGS ve YÖKDİL Kaynak Havuzu)
create table if not exists public.external_resources (
    id text primary key,
    category text not null,
    sub_category text,
    type text not null,
    title text not null,
    provider text not null,
    url text not null,
    duration_or_count text,
    badge text,
    is_recommended boolean default false,
    description text,
    created_at timestamptz default now() not null
);

alter table public.external_resources enable row level security;

drop policy if exists "Herkes harici kaynakları okuyabilir" on public.external_resources;
create policy "Herkes harici kaynakları okuyabilir"
    on public.external_resources for select using (true);

drop policy if exists "Yetkili kullanıcılar harici kaynak ekleyebilir" on public.external_resources;
create policy "Yetkili kullanıcılar harici kaynak ekleyebilir"
    on public.external_resources for all with check (auth.role() = 'authenticated');

-- 8. USER NOTES (Kullanıcının Özel Not Modülü)
create table if not exists public.user_notes (
    id text primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    title text not null,
    content text not null,
    section text not null check (section in ('genel-kultur', 'genel-yetenek', 'bankacilik-genel-kultur', 'oruntu-analitik', 'ingilizce', 'alan', 'genel')),
    tags text[] default array[]::text[],
    priority text default 'P1' check (priority in ('P0', 'P1', 'P2')),
    is_pinned boolean default false,
    color text default 'indigo',
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

alter table public.user_notes enable row level security;

drop policy if exists "Kullanıcı kendi notlarını yönetebilir" on public.user_notes;
create policy "Kullanıcı kendi notlarını yönetebilir"
    on public.user_notes for all
    using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 9. USER CUSTOM RESOURCES (Kullanıcının Eklediği Özel YouTube Videoları & Web Siteleri)
create table if not exists public.user_custom_resources (
    id text primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    resource_type text not null check (resource_type in ('youtube_video', 'youtube_channel', 'website')),
    title text not null,
    url text not null,
    category text default 'genel',
    channel_name text,
    description text,
    created_at timestamptz default now() not null
);

alter table public.user_custom_resources enable row level security;

drop policy if exists "Kullanıcı kendi özel kaynaklarını yönetebilir" on public.user_custom_resources;
create policy "Kullanıcı kendi özel kaynaklarını yönetebilir"
    on public.user_custom_resources for all
    using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 10. USER VIDEO PROGRESS (Video İzlenme Durumları)
create table if not exists public.user_video_progress (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    video_id text not null,
    is_watched boolean default true,
    watched_at timestamptz default now() not null,
    constraint unique_user_video unique (user_id, video_id)
);

alter table public.user_video_progress enable row level security;

drop policy if exists "Kullanıcı kendi video izleme durumunu yönetebilir" on public.user_video_progress;
create policy "Kullanıcı kendi video izleme durumunu yönetebilir"
    on public.user_video_progress for all
    using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 11. OTOMATİK PROFİL OLUŞTURMA TRİGGERI (Auth -> Profiles)
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
`;

fs.writeFileSync('supabase_schema.sql', schemaSql, 'utf8');
console.log('Saved updated supabase_schema.sql');

// 3. SEED DATA GENERATOR
let seedSql = `-- ==============================================================================
-- ZİRAAT BANKASI UZMAN / MÜFETTİŞ YARDIMCILIĞI SINAV HAZIRLIK
-- SUPABASE VERİ YÜKLEME VE GÜNCELLEME BETİĞİ (SEED & SYNC)
-- Son Güncelleme: 9 Ekim 2026
-- Toplam: 220 Soru, 22 Konu Anlatımı, 30 Flashcard, 23 Harici Kaynak
-- ==============================================================================

-- 0. GEREKLİ KISITLAMA GÜNCELLEMELERİ (MIGRATION / ALTER)
-- Eski tablolarda section ve source kısıtlamaları yeni bölümleri engelleyebileceği için güncellenir:
alter table if exists public.questions drop constraint if exists questions_section_check;
alter table if exists public.questions drop constraint if exists questions_source_check;
alter table if exists public.questions add constraint questions_section_check 
    check (section in ('genel-kultur', 'genel-yetenek', 'bankacilik-genel-kultur', 'oruntu-analitik', 'ingilizce', 'alan'));

alter table if exists public.lectures drop constraint if exists lectures_section_check;
alter table if exists public.lectures add constraint lectures_section_check 
    check (section in ('alan', 'genel-kultur', 'genel-yetenek', 'bankacilik-genel-kultur', 'oruntu-analitik', 'ingilizce'));

-- A. QUESTIONS (220 Soru - 80 Alan, 80 İngilizce, 40 GY, 20 GK)
`;

allQuestions.forEach(q => {
    const id = esc(q.id);
    const section = esc(q.section);
    const topic = esc(q.topic);
    const subtopic = esc(q.subtopic || null);
    const difficulty = typeof q.difficulty === 'number' ? q.difficulty : 2;
    const stem = esc(q.stem || q.questionText || '');
    const options = escJson(q.options);
    const answerIndex = q.answerIndex !== undefined ? q.answerIndex : q.correctAnswer;
    const explanation = esc(q.explanation || '');
    const tags = escArray(q.tags || []);
    const source = esc(q.source || 'Ziraat 2026 Sınav Seti');

    seedSql += `insert into public.questions (id, section, topic, subtopic, difficulty, stem, options, answer_index, explanation, tags, source)
values (${id}, ${section}, ${topic}, ${subtopic}, ${difficulty}, ${stem}, ${options}, ${answerIndex}, ${explanation}, ${tags}, ${source})
on conflict (id) do update set
  topic = excluded.topic,
  subtopic = excluded.subtopic,
  difficulty = excluded.difficulty,
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  tags = excluded.tags;
`;
});

seedSql += `\n-- B. LECTURES (22 Konu Anlatımı)\n`;
lectures.forEach(l => {
    const id = esc(l.id);
    const section = esc(l.section);
    const topic = esc(l.topic);
    const title = esc(l.title);
    const readTime = esc(l.readTime || '7 dk');
    const summary = esc(l.summary || '');
    const content = esc(l.content);

    seedSql += `insert into public.lectures (id, section, topic, title, read_time, summary, content)
values (${id}, ${section}, ${topic}, ${title}, ${readTime}, ${summary}, ${content})
on conflict (id) do update set
  section = excluded.section,
  topic = excluded.topic,
  title = excluded.title,
  read_time = excluded.read_time,
  summary = excluded.summary,
  content = excluded.content;
`;
});

seedSql += `\n-- C. FLASHCARDS (30 Bilgi Kartı)\n`;
flashcards.forEach(f => {
    const id = esc(f.id);
    const category = esc(f.category);
    const topic = esc(f.topic);
    const front = esc(f.front);
    const back = esc(f.back);
    const tags = escArray(f.tags || []);

    seedSql += `insert into public.flashcards (id, category, topic, front, back, tags)
values (${id}, ${category}, ${topic}, ${front}, ${back}, ${tags})
on conflict (id) do update set
  category = excluded.category,
  topic = excluded.topic,
  front = excluded.front,
  back = excluded.back,
  tags = excluded.tags;
`;
});

seedSql += `\n-- D. EXTERNAL RESOURCES (23 Harici Kaynak)\n`;
resources.forEach(r => {
    const id = esc(r.id);
    const category = esc(r.category);
    const subCategory = esc(r.subCategory || null);
    const type = esc(r.type);
    const title = esc(r.title);
    const provider = esc(r.provider);
    const url = esc(r.url);
    const durationOrCount = esc(r.durationOrCount || null);
    const badge = esc(r.badge || null);
    const isRecommended = r.isRecommended ? 'true' : 'false';
    const description = esc(r.description || null);

    seedSql += `insert into public.external_resources (id, category, sub_category, type, title, provider, url, duration_or_count, badge, is_recommended, description)
values (${id}, ${category}, ${subCategory}, ${type}, ${title}, ${provider}, ${url}, ${durationOrCount}, ${badge}, ${isRecommended}, ${description})
on conflict (id) do update set
  category = excluded.category,
  sub_category = excluded.sub_category,
  type = excluded.type,
  title = excluded.title,
  provider = excluded.provider,
  url = excluded.url,
  duration_or_count = excluded.duration_or_count,
  badge = excluded.badge,
  is_recommended = excluded.is_recommended,
  description = excluded.description;
`;
});

fs.writeFileSync('supabase_seed_data.sql', seedSql, 'utf8');
console.log('Saved supabase_seed_data.sql');

// 4. COMBINED MASTER SQL (SCHEMA + SEED)
const masterSql = schemaSql + '\n\n' + seedSql;
fs.writeFileSync('supabase_master_update.sql', masterSql, 'utf8');
console.log('Saved combined supabase_master_update.sql');
