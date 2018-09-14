
CREATE TABLE quiz(
	quiz_id SERIAL PRIMARY KEY,
	name VARCHAR(80) NOT NULL,
	type VARCHAR(80),
	questions integer[] REFERENCES
);

CREATE TABLE multiple_choice_questions(
	id SERIAL PRIMARY KEY,
	quiz_id integer REFERENCES quiz,
	text VARCHAR(900) NOT NULL,
	correct_answer CHAR(1) NOT NULL,
	a VARCHAR(900),
	b VARCHAR(900),
	c VARCHAR(900),
	d VARCHAR(900),
	e VARCHAR(900),
	f VARCHAR(900),
	g VARCHAR(900),
	h VARCHAR(900)
);