-- both test users have the password 'password'

INSERT INTO users (username, password, first_name, last_name, email, city, state, fitness_type, bio, image_url, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'joel@joelburton.com',
        'Test City',
        'Test State',
        'Powerlifter',
        'I like to lift weights', 
        'https://www.minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'joel@joelburton.com',
        'Test City',
        'Test State',
        'Bodybuilder',
        'I like to lift weights',
        'https://www.minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg',
        TRUE);


INSERT INTO categories (title, description)
VALUES  ('Bodybuilding', 'This is where you talk about building muscle.'),
        ('Powerlifting', 'This is where you talk about building strength.'),
        ('Cardio', 'This is where you talk about cardio.');


INSERT INTO posts (username, subject, body, date)
VALUES  ('testuser', 'Tips on increasing strength?', 'Hi guys. I''m trying to make a routine that helps me increase my strength. What exercises will do this?', 'Tue Dec 1 2021 10:07:42 GMT-0800 (Pacific Standard Time)'),
        ('testadmin', 'Big arms!!!', 'Hi guys. I want to get BIG arms. What exercises will do this?', 'Tue Nov 14 2021 10:07:42 GMT-0800 (Pacific Standard Time)');

INSERT INTO comments (username, body, date, post_id)
VALUES  ('testuser', 'I really like doing the big three; squats, deadlifts, and bench press.', '12-27-2018', 1),
        ('testadmin', 'Biceps curls and triceps pushdowns if you want to do isolation exercises.', 'Tue Dec 9 2021 10:07:42 GMT-0800 (Pacific Standard Time)', 2),
        ('testadmin', 'Also, doing compiund lifts help', 'Tue Dec 11 2021 10:07:42 GMT-0800 (Pacific Standard Time)', 2);

INSERT INTO equipment (type)
VALUES  ('Band'),           
        ('Barbell'),
        ('Bodyweight'),
        ('Cable'),
        ('Dumbbell'),
        ('Kettlebell'),
        ('Machine'),
        ('Medicine Ball'),
        ('TRX'),
        ('Other');

INSERT INTO muscles (name)
VALUES  ('Abdominals'),
        ('Biceps'),
        ('Calves'),
        ('Chest'),
        ('Glutes'),
        ('Hamstrings'),
        ('Lats'),
        ('Lower Back'),
        ('Middle Back'),
        ('Quadriceps'),
        ('Shoulders'),
        ('Triceps');

INSERT INTO exercises (name, equipment_id, primary_muscle_id, secondary_muscle_id, description, instructions, image_url)
VALUES  
        ('Plank', 3, 1, NULL, 
        'The plank is a popular isometric abdominal exercise that can be performed on your knees or your toes. It is common in all types of exercise programs, as well as in group fitness and yoga classes. It targets the muscles of the core, the deep core or transversus abdominis in particular. It is also often prescribed for time to help back pain or to teach proper bracing.', 
        '1. Get into a prone position on the floor, supporting your weight on your toes and your forearms. Your arms are bent and directly below the shoulder. 2. Keep your body straight at all times, and hold this position as long as possible. To increase difficulty, an arm or leg can be raised.', 'https://i.ibb.co/rk64FTq/plank.jpg'),

        ('Barbell Curl', 2, 2, NULL, 
        'The barbell curl is an arm exercise that is also one of the most recognizable movements in all of bodybuilding and fitness. It helps build sleeve-popping biceps and allows heavier loading than many other curl variations. It is usually performed in moderate to high reps, such as 8-12 reps per set, as part of the arm-focused portion of any workout.', 
        '1. Stand up with your torso upright while holding a barbell at a shoulder-width grip. The palm of your hands should be facing forward and the elbows should be close to the torso. This will be your starting position. 2. While holding the upper arms stationary, curl the weights forward while contracting the biceps as you breathe out. Tip: Only the forearms should move. 3. Continue the movement until your biceps are fully contracted and the bar is at shoulder level. 4. Hold the contracted position for a second and squeeze the biceps hard. 5. Slowly begin to bring the bar back to starting position as your breathe in. 6. Repeat for the recommended amount of repetitions.', 'https://i.ibb.co/0Z7Nbtt/barbell-curl.gif'),

        ('Calf Press', 7, 3, NULL, 
        'The standing calf raise is a popular movement to target the calf muscles of the lower leg, and in particular the gastrocnemius muscles. When unweighted, it is usually performed for high reps or for time.', 
        '1. Adjust the seat so that your legs are only slightly bent in the start position. The balls of your feet should be firmly on the platform. 2. Select an appropriate weight, and grasp the handles. This will be your starting position. 3. Straighten the legs by extending the knees, just barely lifting the weight from the stack. Your ankle should be fully flexed, toes pointing up. Execute the movement by pressing downward through the balls of your feet as far as possible. 4. After a brief pause, reverse the motion and repeat.', 'https://i.ibb.co/7gsm8yb/calf-press.gif'),

        ('Barbell Bench Press', 2, 4, 12, 
        'The bench press is a compound exercise that builds strength and muscle in the chest and triceps. When many people think of listing, the bench press is often the first exercise that comes to mind.', 
        '1. Lie back on a flat bench. Using a medium width grip (a grip that creates a 90-degree angle in the middle of the movement between the forearms and the upper arms), lift the bar from the rack and hold it straight over you with your arms locked. This will be your starting position. 2. From the starting position, breathe in and begin coming down slowly until the bar touches your middle chest. 3. After a brief pause, push the bar back to the starting position as you breathe out. Focus on pushing the bar using your chest muscles. Lock your arms and squeeze your chest in the contracted position at the top of the motion, hold for a second and then start coming down slowly again. Tip: Ideally, lowering the weight should take about twice as long as raising it. 4. Repeat the movement for the prescribed amount of repetitions. 5. When you are done, place the bar back in the rack.', 'https://i.ibb.co/hWptcFF/barbell-benchpress.gif'), 

        ('Glute bridge', 3, 5, 1, 
        'The glute bridge is a popular lower-body bodyweight exercise that primarily targets the glutes, but also activates the lower back and hamstrings. It can be performed with body weight alone, or with added resistance such as barbells, dumbbells, or bands. It can be performed for time or reps and works perfectly in a dynamic warm-up for lower-body training, but can also be performed for glute activation anytime.', 
        '1. Lie flat on the floor on your back with the hands by your side and your knees bent. Your feet should be placed around shoulder width. This will be your starting position. 2. Pushing mainly with your heels, lift your hips off the floor while keeping your back straight. Breathe out as you perform this part of the motion and hold at the top for a second. 3. Slowly go back to the starting position as you breathe in.', 'https://i.ibb.co/xYTxwKG/glute-bridge.gif'), 

        ('Deadlift', 2, 6, 5, 
        'The barbell deadlift is a compound exercise used to develop overall strength and size in the posterior chain. It is a competition lift in the sport of powerlifting, but is also considered a classic benchmark of overall strength. When performed with the hands outside the knees, it is often called a "conventional" deadlift. When the feet are wide and the hands are inside the knees, it is a sumo deadlift.', 
        '1. Approach the bar so that it is centered over your feet. Your feet should be about hip-width apart. Bend at the hip to grip the bar at shoulder-width allowing your shoulder blades to protract. Typically, you would use an alternating grip. 2. With your feet and your grip set, take a big breath and then lower your hips and flex the knees until your shins contact the bar. Look forward with your head. Keep your chest up and your back arched, and begin driving through the heels to move the weight upward. 3. After the bar passes the knees aggressively pull the bar back, pulling your shoulder blades together as you drive your hips forward into the bar. 4. Lower the bar by bending at the hips and guiding it to the floor.', 'https://i.ibb.co/MfCfzNv/deadlift.gif'),

        ('Lat Pulldown', 4, 7, 2, 
        'The lat pull-down is a cable-based exercise that is ubiquitous in gyms around the world. This back builder is easy to learn and highly effective at building back size and strength. It is usually trained in moderate to high reps, such as 8-12 reps per set. If grip strength is a limitation, you can wear wrist straps.', 
        '1. Sit down on a pull-down machine with a wide bar attached to the top pulley. Make sure that you adjust the knee pad of the machine to fit your height. These pads will prevent your body from being raised by the resistance attached to the bar. 2. Grab the bar with the palms facing forward using the prescribed grip. Note on grips: For a wide grip, your hands need to be spaced out at a distance wider than shoulder width. For a medium grip, your hands need to be spaced out at a distance equal to your shoulder width and for a close grip at a distance smaller than your shoulder width. 3. As you have both arms extended in front of you holding the bar at the chosen grip width, bring your torso back around 30 degrees or so while creating a curvature on your lower back and sticking your chest out. This is your starting position. 4. As you breathe out, bring the bar down until it touches your upper chest by drawing the shoulders and the upper arms down and back. Tip: Concentrate on squeezing the back muscles once you reach the full contracted position. The upper torso should remain stationary and only the arms should move. The forearms should do no other work except for holding the bar; therefore do not try to pull down the bar using the forearms. 5. After a second at the contracted position squeezing your shoulder blades together, slowly raise the bar back to the starting position when your arms are fully extended and the lats are fully stretched. Inhale during this portion of the movement. 6. Repeat this motion for the prescribed amount of repetitions.', 'https://i.ibb.co/9GvX4JC/lat-pulldown.gif'),

        ('Pull-Up', 3, 7, 2, 
        'The pull-up is a multi-joint bodyweight exercise that builds strength and muscle in the upper back, biceps, and core. It is often used as a measurement tool in military or tactical fitness tests, and is an excellent gauge of “relative strength” which is strength in relation to bodyweight.', 
        '1. Grab the pull-up bar with the palms facing forward using the prescribed grip. Note on grips: For a wide grip, your hands need to be spaced out at a distance wider than your shoulder width. For a medium grip, your hands need to be spaced out at a distance equal to your shoulder width and for a close grip at a distance smaller than your shoulder width. 2. As you have both arms extended in front of you holding the bar at the chosen grip width, bring your torso back around 30 degrees or so while creating a curvature on your lower back and sticking your chest out. This is your starting position. 3. Pull your torso up until the bar touches your upper chest by drawing the shoulders and the upper arms down and back. Exhale as you perform this portion of the movement. Tip: Concentrate on squeezing the back muscles once you reach the full contracted position. The upper torso should remain stationary as it moves through space and only the arms should move. The forearms should do no other work other than hold the bar. 4. After a second on the contracted position, start to inhale and slowly lower your torso back to the starting position when your arms are fully extended and the lats are fully stretched. 5. Repeat this motion for the prescribed amount of repetitions.', 'https://i.ibb.co/gmxn6VG/pull-ups.gif'),

        ('Bent-Over Barbell Row', 2, 9, 7, 
        'The barbell bent-over row is a compound exercise used to build strength and size in both the lower and upper back. It targets nearly all of the muscles in the back, but particularly the lats, rhomboids, and lower back. It is commonly utilized as an accessory movement for the deadlift in powerlifting, but is also popular in strength and muscle-focused upper-body workouts.', 
        '1. Holding a barbell with a pronated grip (palms facing down), bend your knees slightly and bring your torso forward, by bending at the waist, while keeping the back straight until it is almost parallel to the floor. Tip: Make sure that you keep the head up. The barbell should hang directly in front of you as your arms hang perpendicular to the floor and your torso. This is your starting position. 2. Now, while keeping the torso stationary, breathe out and lift the barbell to you. Keep the elbows close to the body and only use the forearms to hold the weight. At the top contracted position, squeeze the back muscles and hold for a brief pause. 3. Then inhale and slowly lower the barbell back to the starting position. 4. Repeat for the recommended amount of repetitions.', 'https://i.ibb.co/b1q6sFT/barbell-row.gif'),

        ('Seated Cable Row', 4, 9, 7, 
        'The cable seated row is a popular exercise to train the muscles of the upper back, including the lats (latissimus dorsi), traps, rhomboids, and rear deltoids, using a cable stack. It also targets the biceps to a lesser degree. The cable row can work well in a variety of rep-ranges, but is most popular in muscle-building workouts or as an accessory movement for strength workouts.', 
        '1. For this exercise you will need access to a low pulley row machine with a V-bar. Note: The V-bar will enable you to have a neutral grip where the palms of your hands face each other. To get into the starting position, first sit down on the machine and place your feet on the front platform or crossbar provided making sure that your knees are slightly bent and not locked. 2. Lean over as you keep the natural alignment of your back and grab the V-bar handles. 3. With your arms extended pull back until your torso is at a 90-degree angle from your legs. Your back should be slightly arched and your chest should be sticking out. You should be feeling a nice stretch on your lats as you hold the bar in front of you. This is the starting position of the exercise. 4. Keeping the torso stationary, pull the handles back towards your torso while keeping the arms close to it until you touch the abdominals. Breathe out as you perform that movement. At that point you should be squeezing your back muscles hard. Hold that contraction for a second and slowly go back to the original position while breathing in. 5. Repeat for the recommended amount of repetitions.', 'https://i.ibb.co/44S54mW/seated-cable-row.gif'), 

        ('Barbell Squat', 2, 10, 5, 
        'The barbell back squat is a popular compound movement that emphasizes building the lower-body muscle groups and overall strength. It''s the classic way to start a leg day, and is a worthy centerpiece to a lower-body training program. The squat is a competitive lift in the sport of powerlifting, but is also a classic measurement of lower-body strength. With the barbell racked on the traps or upper back, the emphasis is placed on the posterior chain but the entire body gets worked. The back squat can be trained in everything from heavy singles to sets of 20 reps or higher.', 
        '1. Begin with the barbell supported on top of the traps. The chest should be up and the head facing forward. Adopt a hip-width stance with the feet turned out as needed. 2. Descend by flexing the knees, refraining from moving the hips back as much as possible. This requires that the knees travel forward. Ensure that they stay align with the feet. The goal is to keep the torso as upright as possible. 3. Continue all the way down, keeping the weight on the front of the heel. At the moment the upper legs contact the lower legs reverse the motion, driving the weight upward.', 'https://i.ibb.co/c1m1d5f/squat.gif'), 

        ('Dumbbell Lateral Raise', 5, 11, NULL, 
        'The dumbbell lateral raise is an upper body isolation exercise for building shoulder strength and muscle. Its a staple strength training move and is a great option for accessory work on upper body training days. This exercise particularly focuses on the lateral or medial head of the deltoid, making them appear wider and more developed.', 
        '1. Pick a couple of dumbbells and stand with a straight torso and the dumbbells by your side at arm''s length with the palms of the hand facing you. This will be your starting position. 2. While maintaining the torso in a stationary position (no swinging), lift the dumbbells to your side with a slight bend on the elbow and the hands slightly tilted forward as if pouring water in a glass. Continue to go up until you arms are parallel to the floor. Exhale as you execute this movement and pause for a second at the top. 3. Lower the dumbbells back down slowly to the starting position as you inhale. 4. Repeat for the recommended amount of repetitions.', 'https://i.ibb.co/c1YrJQj/dumbbell-lateral-raise.gif'), 

        ('Triceps Dip', 3, 12,	4, 
        'The triceps dip is a bodyweight exercise performed on parallel bars or on a pull-up and dip station. It targets the triceps first, but also stretches and strengthens the chest and shoulders. Dips with a triceps focus are usually performed with an upright torso, the knees bent and crossed, and the arms close to the body. Dips can be performed for low reps for strength or higher reps for muscle growth.', 
        '1. To get into the starting position, hold your body at arm''s length with your arms nearly locked above the bars. 2. Now, inhale and slowly lower yourself downward. Your torso should remain upright and your elbows should stay close to your body. This helps to better focus on tricep involvement. Lower yourself until there is a 90 degree angle formed between the upper arm and forearm. 3. Then, exhale and push your torso back up using your triceps to bring your body back to the starting position. 4. Repeat the movement for the prescribed amount of repetitions.', 'https://i.ibb.co/gb0j7RJ/triceps-dip.gif'),

        ('Triceps Pushdown', 4, 12, NULL, 'The triceps push-down is a popular gym exercise for targeting the triceps. It utilizes an angled bar, which can allow you to move heavier weights more comfortably than a straight bar or rope. It is usually performed for moderate to high reps, such as 8-12 reps or more per set, as part of an upper-body or arm-focused workout.', '1. Attach a straight or angled bar to a high pulley and grab with an overhand grip (palms facing down) at shoulder width. 2. Standing upright with the torso straight and a very small inclination forward, bring the upper arms close to your body and perpendicular to the floor. The forearms should be pointing up towards the pulley as they hold the bar. This is your starting position. 3. Using the triceps, bring the bar down until it touches the front of your thighs and the arms are fully extended perpendicular to the floor. The upper arms should always remain stationary next to your torso and only the forearms should move. Exhale as you perform this movement. 4. After a second hold at the contracted position, bring the bar slowly up to the starting point. Breathe in as you perform this step. 5. Repeat for the recommended amount of repetitions.', 'https://i.ibb.co/9gVYLGj/triceps-pushdown.gif');

INSERT INTO routines (name, username, description, is_private)
VALUES ('Get big', 'testuser', 'Be sure to have nice and controlled reps.', FALSE),
        ('Powerbuiding', 'testadmin', 'Be sure to have nice and controlled reps.', FALSE),
        ('The best workout', 'testadmin', 'Be sure to have nice and controlled reps.', FALSE);

INSERT INTO routines_exercises (routine_id, exercise_id, dayOfWeek, reps, sets)
VALUES (1, 2, 1, 3, 10),
        (1, 2, 1, 3, 10);

INSERT INTO logs (date, username)
VALUES  ('2019-06-04', 'testuser');



INSERT INTO logs_entries (log_id, routine_exercise_id, set_number, reps, weight)
VALUES  (1, 1, 1, 10, 10),
        (1, 1, 2, 10, 10),
        (1, 1, 3, 10, 10),
        (1, 2, 1, 10, 100),
        (1, 2, 2, 10, 100),
        (1, 2, 3, 10, 100);


