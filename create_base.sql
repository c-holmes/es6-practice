CREATE TABLE article (
	id INT(10) UNSIGNED,
	author_id INT(10) UNSIGNED,
	title VARCHAR(40),
	text TEXT,
	created DATETIME,
	modified DATETIME
)

CREATE TABLE comment (
	id INT(10) UNSIGNED,
	author_id INT(10) UNSIGNED,
	article_id INT(10) UNSIGNED,
	text TEXT,
	created DATETIME,
	modified DATETIME
)

CREATE TABLE user (
	id INT(10) UNSIGNED,
	name VARCHAR(40),
	description VARCHAR(256),
	created DATETIME,
	modified DATETIME
)