ALTER TABLE admin_profiles
    ADD COLUMN IF NOT EXISTS department_tag TEXT DEFAULT 'ict-directorate';

ALTER TABLE news_posts
    ADD COLUMN IF NOT EXISTS author_tag TEXT DEFAULT 'ict-directorate';