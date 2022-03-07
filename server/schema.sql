
CREATE TABLE users (
    username       VARCHAR(25) PRIMARY KEY,
    password       TEXT NOT NULL,
    first_name     TEXT NOT NULL,
    last_name      TEXT NOT NULL,
    email          TEXT NOT NULL
                    CHECK (position('@' IN email) > 1),
    city           TEXT NOT NULL,
    state          TEXT NOT NULL,
    fitness_type   TEXT NOT NULL,
    bio            TEXT NOT NULL,
    image_url      TEXT,
    is_admin       BOOLEAN NOT NULL DEFAULT FALSE
);



--RULE      TEXT   -> parse this -> evaluate
    --- postsMoreThan,100
-- CREATE TABLE badges (
--     id          SERIAL PRIMARY KEY,
--     title       TEXT NOT NULL,
--     graphic     TEXT NOT NULL
-- );


-- Stores what badges users have
-- CREATE TABLE users_badges (
--     username     TEXT NOT NULL 
--                 REFERENCES users ON DELETE CASCADE,
--     badge_id    INTEGER NOT NULL 
--                 REFERENCES badges ON DELETE CASCADE,
--     PRIMARY KEY (username, badge_id)
-- );

CREATE TABLE categories (
    id          SERIAL PRIMARY KEY,
    title       TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE posts (
    id          SERIAL PRIMARY KEY,
    username    TEXT NOT NULL
                    REFERENCES users ON DELETE SET NULL,
-- One to Many Relationship; One category can have many posts
    -- category_id INTEGER NOT NULL
    --                 REFERENCES categories ON DELETE SET NULL,
    subject     TEXT NOT NULL,
    body        VARCHAR(140) NOT NULL,
    date        TEXT

    --routine_id  optional fk to Routine
);


CREATE TABLE comments (
    id          SERIAL PRIMARY KEY,
    username    TEXT NOT NULL 
                    REFERENCES users ON DELETE SET NULL,
    body        TEXT NOT NULL,
    date        TEXT,
    -- One to Many Relationship; One post can have many comments
    post_id     INTEGER NOT NULL
                    REFERENCES posts ON DELETE CASCADE
);

-- Maps users likes on posts
CREATE TABLE users_posts_votes (
    id          SERIAL PRIMARY KEY,
    username    TEXT
                    REFERENCES users ON DELETE CASCADE,
    post_id     INTEGER 
                    REFERENCES posts ON DELETE CASCADE
    -- value (+1, -1)
);

-- Maps users likes on comments
CREATE TABLE users_comments_votes (
    id          SERIAL PRIMARY KEY,
    username    TEXT
                    REFERENCES users ON DELETE CASCADE,
    comment_id  INTEGER 
                    REFERENCES comments ON DELETE CASCADE
    -- value (+1, -1)
);



--Workouts, routines

-- List of equipment types
-- ex. barbell, dumbbell, bodyweight, cable machine, bands
CREATE TABLE equipment (
    id      SERIAL PRIMARY KEY,
    type    TEXT NOT NULL
);

CREATE TABLE muscles (
    id      SERIAL PRIMARY KEY,
    name    TEXT NOT NULL
);


--Exercise : e.g. Deadlift, How to do the exercise
-- List of exercises
CREATE TABLE exercises (
    id                  SERIAL PRIMARY KEY,
    name                TEXT UNIQUE NOT NULL,
    equipment_id        INTEGER
                            REFERENCES equipment ON DELETE SET NULL,
    primary_muscle_id   INTEGER 
                            REFERENCES muscles ON DELETE CASCADE,
    secondary_muscle_id INTEGER
                            REFERENCES muscles ON DELETE SET NULL,
    description         TEXT,
    instructions        TEXT,
    image_url           TEXT
);


--Routine : Rippetoe's Starting Strength . Public vs. Private / User ID
-- List of Routines
CREATE TABLE routines (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    username    TEXT
                    REFERENCES users ON DELETE SET NULL,
    description TEXT,
    is_private  BOOLEAN NOT NULL DEFAULT FALSE
);



--RoutineExercise :  5 x 5 Deadlifts on Tuesday with Rippetoe's Starting Strength
-- List of which exercises are a part of which routine
CREATE TABLE routines_exercises (
    id          SERIAL PRIMARY KEY,
    routine_id  INTEGER
                    REFERENCES routines ON DELETE CASCADE,
    exercise_id INTEGER
                    REFERENCES exercises ON DELETE CASCADE,
    dayOfWeek   INTEGER, --added
    reps        INTEGER, --added
    sets        INTEGER --added
);



--RoutineExerciseResult: On 11/16/2021 User ID 5 did 4 of 5 deadlifts at 400 lbs + RoutineExercise ID

-- List of log entries for each routine and exercise
CREATE TABLE logs (
    id                  SERIAL PRIMARY KEY,
    date                TEXT NOT NULL,
    username            TEXT NOT NULL
                            REFERENCES users ON DELETE CASCADE
);

-- List of log entries for each routine and exercise
CREATE TABLE logs_entries (
    id                  SERIAL PRIMARY KEY,
    log_id              INTEGER
                            REFERENCES logs ON DELETE CASCADE,
    routine_exercise_id INTEGER
                            REFERENCES routines_exercises ON DELETE CASCADE,
    set_number          INTEGER,
    reps                INTEGER,
    weight              INTEGER
);

--Example of storing multiples
--API (receives multiple logs)
-- API creates SQL statement with multiple inserts at the same time
-- INSERT INTO Logs (set_number, reps, weight) VALUES 
-- (1, 5, 400),
-- (1, 5, 400),
-- (1, 5, 400),
-- (1, 5, 400)

