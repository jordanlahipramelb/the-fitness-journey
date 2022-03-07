\echo 'Delete and recreate fitness_journey db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE fitness_journey;
CREATE DATABASE fitness_journey;
\connect fitness_journey

\i schema.sql
\i seed.sql

