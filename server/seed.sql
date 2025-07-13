CREATE TABLE IF NOT EXISTS exercises (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    category INT REFERENCES types(id)
);

CREATE TABLE IF NOT EXISTS workouts (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(55) NOT NULL,
    description VARCHAR(255) NOT NULL,
    category INT REFERENCES types(id),
    image VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS workouts_exercises (
    workout_id INT REFERENCES workouts(id) ON DELETE CASCADE,
    exercise_id INT REFERENCES exercises(id),
    sets INT NOT NULL,
    reps INT NOT NULL,
    PRIMARY KEY (workout_id, exercise_id)
);


CREATE TABLE IF NOT EXISTS types (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(55) NOT NULL
);


INSERT INTO types(name) VALUES ('Chest'), ('Back'), ('Legs'), ('Shoulders'), ('Arms'), ('Core'), ('Upper Body'), ('Lower Body'), ('Full Body'), ('Push'), ('Pull')

INSERT INTO exercises (name, description, category) VALUES
-- Chest (ID = 1)
('Bench Press', 'Compound lift targeting chest, shoulders, and triceps using a barbell.', 1),
('Flat Dumbbell Press', 'Dumbbell press on an flat bench to target the chest.', 1),
('Incline Dumbbell Press', 'Dumbbell press on an inclined bench to emphasize upper chest.', 1),
('Incline Barbell Press', 'Barbell press on an inclined bench to emphasize upper chest.', 1),
('Cable Fly', 'Isolation movement that stretches and contracts the pectorals using cables.', 1),
('Machine Fly', 'Isolation movement that stretches and contracts the pectorals using a pec deck/machine fly.', 1),

-- Back (ID = 2)
('Deadlift', 'Foundational lift engaging lower back, glutes, and hamstrings.', 2),
('Machine Row', 'Strengthens upper and middle back using a pulling motion.', 2),
('Bent-over Row', 'Strengthens upper and middle back using a pulling motion.', 2),
('Lat pulldown', 'Machine exercise that targets lats and upper back muscles.', 2),
('Pull-up', 'Bodyweight exercise that targets lats and upper back muscles.', 2),
('Cable Pull-over', 'isolation exercise that builds back width and reinforces shoulder stability.', 2),

-- Legs (ID = 3)
('Squat', 'Multi-joint movement training quads, glutes, hamstrings, and core.', 3),
('Leg curl', 'Use of a leg curl machine to focus on hamstrings.', 3),
('Leg extensions', 'Use of a leg extension machine to focus on quads.', 3),
('Lunge', 'Leg exercise that improves balance and unilateral strength.', 3),
('Romanian Deadlift', 'Targets hamstrings and glutes through hip hinge motion.', 3),

-- Shoulders (ID = 4)
('Overhead Press', 'Vertical press movement that builds deltoid and tricep strength.', 4),
('Seated Press', 'Vertical press movement that builds deltoid and tricep strength, using an upright bench to stabalise the movement.', 4),
('Lateral Raise', 'Raises dumbbells to the sides to isolate lateral deltoid muscles.', 4),
('Front Raise', 'Targets anterior deltoids by lifting dumbbells in front of the body.', 4),
('Reverse Fly', 'Targets rear deltoids by raising weights out to the sides in an arc while maintaining a slight bend in the elbows. ', 4),

-- Arms (ID = 5)
('Barbell Curl', 'Classic biceps builder performed with a straight barbell.', 5),
('Dumbbell Curl', 'Classic biceps builder performed with dumbbells.', 5),
('Tricep Dips', 'Bodyweight exercise using parallel bars to work the triceps.', 5),
('Tricep pushdown', 'pushing a weight downward against resistance, typically using a cable machine with various attachments like a straight bar or rope.', 5),
('Hammer Curl', 'Variation of curl that engages forearms and outer biceps.', 5),

-- Core (ID = 6)
('Plank', 'Isometric hold that engages the entire core region.', 6),
('Russian Twist', 'Rotational core exercise performed with or without weight.', 6),
('Hanging Leg Raise', 'Targets lower abs while hanging from a bar.', 6);


INSERT INTO workouts (name, description, creator, category, image) VALUES ('Chest workout', 'Chest focused workout', '1', 'https://media.istockphoto.com/id/1735059386/video/pain-and-injury-in-the-chest-pectoralis-major-and-minor-muscles.jpg?s=640x640&k=20&c=xAk65ZRPSnqRsNKsGI-0xpEdYxt-sSybNVo_CfObOXI=');

INSERT INTO workouts_exercises (workout_id, exercise_id, sets, reps) VALUES ('1', '1', '3', '8'), ('1', '3', '3', '10'), ('1', '6', '3', '10'), ('1', '20', '3', '12'), ('1', '25', '3', '10')

INSERT INTO workouts (name, description, creator, category, image) VALUES 
('Back workout', 'Back focused workout', '2', 'https://media.istockphoto.com/id/1735127228/video/pain-and-injury-in-the-latissimus-dorsi-muscles.jpg?s=640x640&k=20&c=zGiB-1mA1_wAGysRwXiybeD9mXmY6iF3cec2YK9tvnA='), 
('Leg workout', 'Leg focused workout','3', 'https://thumbs.dreamstime.com/b/illustration-highlights-red-muscle-structure-human-leg-showing-its-anatomical-details-medical-education-378562799.jpg'), 
('Shoulder workout', 'Shoulder focused workout','4', 'https://media.gettyimages.com/id/2166482499/video/highlight-ache-and-strained-shoulder-muscles.jpg?s=640x640&k=20&c=g8wtZaj9lPgAvhtUgu9haYOw0Ej_w6RY_ZDfUJAHlVQ='), 
('Arm workout', 'Arm focused workout', '5', 'https://img.freepik.com/premium-photo/anatomy-muscular-man39s-arm-detailed-image-showing-red-white-tissue-concept-muscle-anatomy-human-body-red-white-tissue-arm-muscles-detailed-illustration_918839-149345.jpg'), 
('Upper Body workout', 'Upper body focused workout','7', 'https://png.pngtree.com/background/20230611/original/pngtree-the-upper-body-muscles-are-shown-up-close-picture-image_3164623.jpg'),
('Lower Body workout', 'Lower body focused workout', '8', 'https://media.istockphoto.com/id/495607490/video/sartorius-leg-muscles-anatomy-anaimation.jpg?s=640x640&k=20&c=W6JZEoRNWNCiwEEajckIZpOB4luNvFDNfTnZnmpTadQ='),
('Full Body workout', 'Full body workout', '9', 'https://www.shutterstock.com/shutterstock/videos/1109002461/thumb/1.jpg?ip=x480')

INSERT INTO workouts_exercises (workout_id, exercise_id, sets, reps) VALUES ('1', '1', '3', '8'), ('1', '3', '3', '10'), ('1', '6', '3', '10'), ('1', '20', '3', '12'), ('1', '25', '3', '10')


INSERT INTO workouts_exercises (workout_id, exercise_id, sets, reps) VALUES
(2, 7, 4, 6),     -- Deadlift
(2, 8, 3, 10),    -- Machine Row
(2, 9, 3, 10),    -- Bent-over Row
(2, 10, 3, 12),   -- Lat Pulldown
(2, 11, 3, 8),    -- Pull-up
(2, 12, 3, 15),   -- Cable Pull-over
(3, 13, 4, 8),    -- Squat
(3, 14, 3, 12),   -- Leg Curl
(3, 15, 3, 12),   -- Leg Extensions
(3, 16, 3, 10),   -- Lunge
(3, 17, 4, 10),   -- Romanian Deadlift
(4, 18, 4, 8),   -- Overhead Press
(4, 19, 3, 10),  -- Seated Press
(4, 20, 3, 12),  -- Lateral Raise
(4, 21, 3, 12),  -- Front Raise
(4, 22, 3, 15),  -- Reverse Fly
(5, 23, 4, 8),   -- Barbell Curl
(5, 24, 3, 10),  -- Dumbbell Curl
(5, 25, 3, 12),  -- Tricep Dips
(5, 26, 3, 12),  -- Tricep Pushdown
(5, 27, 3, 10),  -- Hammer Curl
(6, 1, 4, 8),   -- Bench Press
(6, 2, 3, 10),  -- Flat Dumbbell Press
(6, 7, 4, 6),   -- Deadlift
(6, 10, 3, 12), -- Lat Pulldown
(6, 18, 3, 10), -- Overhead Press
(6, 20, 3, 12), -- Lateral Raise
(6, 23, 3, 10), -- Barbell Curl
(6, 26, 3, 12), -- Tricep Pushdown
(7, 13, 4, 8),   -- Squat
(7, 14, 3, 12),  -- Leg Curl
(7, 15, 3, 12),  -- Leg Extensions
(7, 16, 3, 10),  -- Lunge
(7, 17, 4, 10),  -- Romanian Deadlift
(8, 1, 4, 8),    -- Bench Press
(8, 5, 3, 12),   -- Cable Fly
(8, 7, 4, 6),    -- Deadlift
(8, 10, 3, 12),  -- Lat Pulldown
(8, 13, 4, 8),   -- Squat
(8, 17, 3, 10),  -- Romanian Deadlift
(8, 18, 3, 10),  -- Overhead Press
(8, 20, 3, 12),  -- Lateral Raise
(8, 23, 3, 10),  -- Barbell Curl
(8, 26, 3, 12),  -- Tricep Pushdown
(8, 28, 3, 20)  -- Russian Twist