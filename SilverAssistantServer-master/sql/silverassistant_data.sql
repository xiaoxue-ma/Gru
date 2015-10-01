-- phpMyAdmin SQL Dump
-- version 4.2.8.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 30, 2015 at 04:12 PM
-- Server version: 5.5.40
-- PHP Version: 5.4.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `silverassistant`
--

--
-- Dumping data for table `chatgroup`
--

INSERT INTO `chatgroup` (`id`, `name`) VALUES
(1, 'FamilySNS'),
(2, 'FS');

--
-- Dumping data for table `chat_message`
--

INSERT INTO `chat_message` (`id`, `type`, `from_user_id`, `to_user_id`, `text_content`, `audio_content`, `audio_length`, `status`, `timestamp`) VALUES
(1, 'text', 1, 2, 'Siyao to Ailiya. It''s a loooooooooooooooooooooooooooooooooooooooong message', '', 0, 'read', '2015-05-05 16:22:53'),
(2, 'text', 2, 1, 'Ailiya to Siyao', '', 0, 'read', '2015-05-05 16:22:52'),
(3, 'text', 1, 3, 'Siyao to Kaiyu', '', 0, 'unread', '2015-05-05 16:33:29'),
(4, 'text', 2, 3, 'Ailiya to Kaiyu', '', 0, 'unread', '2015-05-05 16:33:29'),
(5, 'text', 2, 1, 'Ailiya to Siyao again', '', 0, 'read', '2015-05-05 16:33:52'),
(6, 'text', 1, 2, 'send', '', 0, 'read', '2015-05-05 20:52:28'),
(13, 'text', 1, 2, 'send again', '', 0, 'read', '2015-05-06 21:05:07'),
(14, 'text', 1, 2, 'a1', '', 0, 'read', '2015-05-07 16:20:07'),
(15, 'text', 1, 2, 'a2', '', 0, 'read', '2015-05-07 16:20:11'),
(16, 'text', 1, 2, 'a3', '', 0, 'read', '2015-05-07 16:20:14'),
(17, 'text', 1, 2, 'a4', '', 0, 'read', '2015-05-07 16:23:49'),
(18, 'text', 1, 2, 'a5', '', 0, 'read', '2015-05-07 16:23:52'),
(19, 'text', 1, 2, 'a6', '', 0, 'read', '2015-05-07 16:24:00'),
(20, 'text', 1, 2, 'Hi', '', 0, 'read', '2015-05-13 06:41:39');

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `text_content`, `status_id`, `sent_by_user_id`, `send_to_user_id`, `timestamp`) VALUES
(1, 'a comment', 1, 2, 1, '0000-00-00 00:00:00'),
(2, 'I like this!', 2, 3, 1, '2015-02-08 11:17:05'),
(3, 'I like this too!', 2, 1, 3, '2015-02-08 11:17:05'),
(8, 'inside after click', 1, 1, 2, '2015-02-09 15:44:06'),
(9, 'Test comment on Ailiya''s status!', 3, 1, 2, '2015-02-09 15:50:31'),
(11, 'Bio mode!', 5, 1, 1, '2015-02-09 17:14:21'),
(12, 'bug fixed?', 10, 1, 1, '2015-05-07 16:22:55'),
(13, 'no', 10, 2, 1, '2015-08-18 14:12:43');

--
-- Dumping data for table `comment_user_like`
--

INSERT INTO `comment_user_like` (`comment_id`, `user_id`, `timestamp`) VALUES
(1, 2, '2015-01-05 15:08:31');

--
-- Dumping data for table `group_chat_message`
--

INSERT INTO `group_chat_message` (`id`, `type`, `from_user_id`, `to_group_id`, `text_content`, `audio_content`, `audio_length`, `timestamp`) VALUES
(1, 'text', 1, 1, 'Siyao in Group', '', 0, '2015-05-06 19:56:18'),
(2, 'text', 2, 1, 'Ailiya in Group', '', 0, '2015-05-06 19:56:18'),
(3, 'text', 3, 1, 'Kaiyu in Group', '', 0, '2015-05-06 19:56:31'),
(4, 'text', 1, 1, 'emit!!', '', 0, '2015-05-07 10:51:31'),
(18, 'text', 1, 1, 'g1', '', 0, '2015-05-07 16:16:43'),
(19, 'text', 1, 1, 'g2', '', 0, '2015-05-07 16:17:57'),
(20, 'text', 1, 1, 'g3', '', 0, '2015-05-07 16:19:43'),
(21, 'text', 1, 1, 'g4', '', 0, '2015-05-07 16:19:46'),
(22, 'text', 1, 1, 'g5', '', 0, '2015-05-07 16:19:49'),
(23, 'text', 1, 1, 'Test after refactor', '', 0, '2015-09-13 11:38:48'),
(24, 'text', 1, 1, 'refactor 2', '', 0, '2015-09-27 09:06:00'),
(25, 'audio', 1, 1, '[Audio]', NULL, NULL, '2015-09-27 12:45:07'),
(26, 'audio', 1, 1, '[Audio]', NULL, NULL, '2015-09-27 12:46:02'),
(27, 'audio', 1, 1, '[Audio]', 'g27.amr', NULL, '2015-09-27 12:46:35'),
(28, 'audio', 1, 1, '[Audio]', 'g28.amr', 3, '2015-09-27 13:35:02');

--
-- Dumping data for table `picture`
--

INSERT INTO `picture` (`id`, `content`, `status_id`) VALUES
(1, '1_1.jpg', 1),
(2, '1_2.jpg', 1),
(3, '1_2.jpg', 1),
(4, '1_2.jpg', 1),
(5, '1_2.jpg', 1),
(6, '10_0.jpg', 10),
(7, '17_0.jpg', 17),
(8, '18_0.jpg', 18),
(9, '19_0.jpg', 19);

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `timestamp`, `event_timestamp`, `text_content`, `user_id`, `location`, `ta_question_id`) VALUES
(1, '2015-01-05 08:52:30', '2014-11-03 16:00:00', 'lol', 1, NULL, NULL),
(2, '2015-02-04 06:47:30', '2015-01-04 16:00:00', 'lol2', 1, NULL, NULL),
(3, '2015-02-08 14:06:17', '2015-01-18 16:00:00', 'This is Ailiya''s post', 2, NULL, NULL),
(4, '2015-02-08 14:06:17', '2014-12-15 16:00:00', 'This is Kaiyu''s first post', 3, NULL, NULL),
(5, '2015-02-08 15:41:52', '2014-11-30 16:00:00', 'Siyao''s first post!', 1, NULL, NULL),
(10, '2015-02-12 14:29:44', '2015-02-12 14:29:42', 'With pic!', 1, NULL, NULL),
(11, '2015-08-18 14:13:31', '2015-08-18 14:13:31', 'try', 2, NULL, NULL),
(12, '2015-09-24 15:32:50', '2015-09-24 15:32:50', 'Piccccc', 1, NULL, NULL),
(13, '2015-09-24 15:35:17', '2015-09-24 15:35:17', 'Cdv', 1, NULL, NULL),
(14, '2015-09-26 07:33:56', '2015-09-26 07:33:56', 'Roload off', 1, NULL, NULL),
(15, '2015-09-26 07:45:43', '2015-09-26 07:45:43', 'Ddd', 1, NULL, NULL),
(16, '2015-09-26 07:47:47', '2015-09-26 07:47:44', 'Eee', 1, NULL, NULL),
(17, '2015-09-26 07:55:19', '2015-09-26 07:55:19', 'Eeeeee', 1, NULL, NULL),
(18, '2015-09-26 08:03:17', '2015-09-26 08:03:17', 'Ref', 1, NULL, NULL),
(19, '2015-09-26 09:43:12', '2015-09-26 09:43:12', 'O', 1, NULL, NULL);

--
-- Dumping data for table `status_tag`
--

INSERT INTO `status_tag` (`status_id`, `tag_id`, `tagged_by_user`, `timestamp`) VALUES
(1, 1, 1, '2015-02-08 09:37:11'),
(1, 2, 1, '2015-02-08 09:37:11'),
(11, 16, 2, '2015-08-18 14:13:31'),
(12, 14, 1, '2015-09-24 15:32:51');

--
-- Dumping data for table `status_user_like`
--

INSERT INTO `status_user_like` (`status_id`, `user_id`, `timestamp`) VALUES
(1, 1, '2015-01-05 15:08:12'),
(4, 1, '2015-02-09 14:02:04'),
(10, 2, '2015-08-18 14:12:31');

--
-- Dumping data for table `tag`
--

INSERT INTO `tag` (`id`, `text_content`) VALUES
(1, 'testtag1'),
(2, 'testtag2'),
(3, 'Phototest'),
(4, 'Time test'),
(5, 'LocationTest'),
(6, 'tag'),
(7, 'po'),
(8, 'q'),
(9, 'p'),
(10, 'y'),
(11, 't'),
(12, 'e'),
(13, 's'),
(14, 'test'),
(15, 'test2'),
(16, 'try'),
(17, '');

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `name`, `phone_number`, `password`, `description`, `verification_status`, `verification_code`, `icon`, `fb_token`) VALUES
(1, 'Siyao', 94681496, '1234', NULL, 'verified', NULL, '1.jpg', 'CAALWAgarVpUBAGJ0O86OzqH4e1g7IpbIMFqCL0XFJZC5HwCuZCTZCRGWlxoaUi94kOs8FJe9993H5RtsrJleGgZAAqHRxN9ZBnQ8BgHuRnOcf43lfwivwNsqWqeHLqbQBvKBAbKt0akfDalvJqFKZBeR50ls8g9caRnAOUasZA9ZBoqL3oxbfpGpZBj3uFjKDfPADbHe19ASgmkRLkDAgWQ1g'),
(2, 'Ailiya', 94681498, '1234', NULL, 'verified', NULL, '2.jpg', NULL),
(3, 'Kaiyu', 94681499, '1234', NULL, 'verified', NULL, '3.jpg', NULL),
(4, 'Siyaooooooooo', 6594681497, '12345', NULL, 'verified', '7bb74d', NULL, NULL),
(11, 'Silver Assistant', 0, '0', 'Silver Assistant Official Account', 'verified', NULL, NULL, NULL);

--
-- Dumping data for table `user_chatgroup`
--

INSERT INTO `user_chatgroup` (`user_id`, `chatgroup_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(1, 2),
(2, 2);

--
-- Dumping data for table `user_user`
--

INSERT INTO `user_user` (`user_id1`, `user_id2`, `nickname`, `relationship`, `status`) VALUES
(1, 2, 'Ailiya Nickname', 'Friend', 'confirmed'),
(1, 3, 'Kaiyu Nickname', 'Team', 'confirmed'),
(2, 1, 'Siyao Nick', 'Team', 'confirmed'),
(3, 1, '', 'Team', 'confirmed');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
