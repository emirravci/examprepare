# Sınav Hazırlık Projesi - Supabase Kurulum Rehberi

Bu proje **Supabase** veritabanı ve kimlik doğrulama (Auth) altyapısı üzerine kurulmuştur. Yeni bir Supabase projesi oluşturup bu projeye bağlamak için aşağıdaki adımları izleyebilirsiniz.

---

## 1. Supabase Projesi Oluşturma

1. [supabase.com](https://supabase.com) adresine gidin ve hesabınıza giriş yapın (yoksa ücretsiz üye olun).
2. **"New Project"** butonuna tıklayın.
3. Proje adını (örneğin `sinav-hazirlik` veya `exam-prepare`) belirleyin ve güçlü bir veritabanı şifresi oluşturun.
4. Sunucu bölgesi olarak Türkiye'ye en yakın olanı seçin (örn: `Frankfurt - eu-central-1`).
5. Projenin oluşturulmasını bekleyin (yaklaşık 1-2 dakika sürer).

---

## 2. API Bilgilerini Alma

Projeniz oluşturulduktan sonra:
1. Sol menüden alt kısımdaki **Project Settings (Çark simgesi)** > **API** sekmesine gidin.
2. Aşağıdaki iki bilgiyi kopyalayın:
   - **Project URL** (örnek: `https://xxxxxxxx.supabase.co`)
   - **Project API keys** bölümündeki **anon / public** key (örnek: `eyJhbGciOi...` veya `sb_publishable_...`)
3. Proje klasöründeki `js/supabase.js` dosyasını açıp bu bilgileri ilgili yerlere yapıştırın:

```javascript
export const SUPABASE_URL = "BURAYA_PROJECT_URL_YAZIN";
export const SUPABASE_ANON_KEY = "BURAYA_ANON_KEY_YAZIN";
```

---

## 3. Auth (Giriş & Kayıt) Ayarları

Kullanıcıların e-posta onayı beklemeden hızlıca test edebilmesi veya doğrudan giriş yapabilmesi için:
1. Sol menüden **Authentication** > **Providers** sekmesine gidin.
2. **Email** seçeneğine tıklayın.
3. İsteğe bağlı olarak **"Confirm email"** seçeneğini kapatabilirsiniz (Disabled yaparsanız kayıt olan kullanıcılar onay postası beklemeden anında giriş yapabilir).
4. Değişiklikleri kaydedin (**Save**).

---

## 4. Kullanıcı Profilleri ve Temel Veritabanı Tablosu (SQL Editor)

Sol menüden **SQL Editor** bölümüne gidin, **"New Query"** seçeneğine tıklayıp aşağıdaki başlangıç tablosunu çalıştırın:

```sql
-- 1. Kullanıcı Profilleri Tablosu (Otomatik auth.users ile ilişkili)
create table if not exists profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name text,
    avatar_url text,
    target_exam text default 'Genel',
    target_score numeric default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS (Row Level Security) Aktif Et
alter table profiles enable row level security;

-- Herkes sadece kendi profilini görebilir ve güncelleyebilir
create policy "Kullanıcılar kendi profilini görebilir"
    on profiles for select
    using (auth.uid() = id);

create policy "Kullanıcılar kendi profilini güncelleyebilir"
    on profiles for update
    using (auth.uid() = id);

create policy "Kullanıcılar profil ekleyebilir"
    on profiles for insert
    with check (auth.uid() = id);

-- Kullanıcı kayıt olduğunda otomatik profil satırı oluşturan trigger
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

> **Not:** Projede yer alacak sınav hazırlık modüllerine göre (örneğin Deneme Sınavları, Hedefler, Konu Takibi, Çalışma Notları, Pomodoro vb.) detaylı tabloları konuşup projeye birlikte ekleyeceğiz.
