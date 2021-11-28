CREATE TABLE IF NOT EXISTS `Forums` (
  `Forum_name` varchar(255),
  `Summary` varchar(255),
  `Description` text,
  `Creator_username` varchar(255),
  `id` mediumint UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `Date_created` date,
  `Image_name` varchar(255)
);

CREATE TABLE IF NOT EXISTS `Comments` (
  `Comment` text,
  `Comment_id` mediumint UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `forum_id` mediumint UNSIGNED,
  `Poster_username` varchar(255),
  `Date_posted` date
);
ALTER TABLE Comments
ADD FOREIGN KEY (forum_id) REFERENCES Forums(id);
