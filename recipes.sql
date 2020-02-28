-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 28, 2020 at 02:11 AM
-- Server version: 5.5.64-MariaDB
-- PHP Version: 5.5.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recipes`
--

-- --------------------------------------------------------

--
-- Table structure for table `author`
--

CREATE TABLE `author` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `site` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ingredient`
--

CREATE TABLE `ingredient` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ingredient_row`
--

CREATE TABLE `ingredient_row` (
  `id` int(10) NOT NULL,
  `recipe` int(10) NOT NULL,
  `list_order` int(2) NOT NULL,
  `size` float NOT NULL,
  `variance` float DEFAULT NULL,
  `measurement` int(4) NOT NULL,
  `ingredient` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `instruction`
--

CREATE TABLE `instruction` (
  `id` int(10) NOT NULL,
  `recipe` int(10) NOT NULL,
  `step` int(2) NOT NULL,
  `text` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `measurement`
--

CREATE TABLE `measurement` (
  `unit` varchar(12) NOT NULL,
  `category` varchar(10) NOT NULL,
  `base_size` float(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `nutrition`
--

CREATE TABLE `nutrition` (
  `id` int(10) NOT NULL,
  `recipe` int(10) NOT NULL COMMENT 'only linked to recipe OR ingredient',
  `ingredient` int(10) NOT NULL COMMENT 'only linked to recipe OR ingredient',
  `calories` int(4) NOT NULL,
  `serving_size` float NOT NULL,
  `total_carbs` int(3) NOT NULL COMMENT 'composite',
  `dietary_fiber` int(3) NOT NULL,
  `sugars` int(3) NOT NULL,
  `total_fat` int(3) NOT NULL,
  `saturated_fat` int(3) NOT NULL,
  `trans_fat` int(3) NOT NULL,
  `sodium` int(3) NOT NULL,
  `vitamins_minerals` int(6) NOT NULL COMMENT 'another table?'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `recipe`
--

CREATE TABLE `recipe` (
  `id` int(10) NOT NULL,
  `source` int(6) NOT NULL,
  `url` varchar(1000) NOT NULL,
  `title` varchar(100) NOT NULL,
  `author` int(10) NOT NULL,
  `cook_time` time NOT NULL,
  `prep_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `site`
--

CREATE TABLE `site` (
  `id` int(10) NOT NULL,
  `base_url` int(50) NOT NULL,
  `site_title` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`id`),
  ADD KEY `site` (`site`);

--
-- Indexes for table `ingredient`
--
ALTER TABLE `ingredient`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ingredient_row`
--
ALTER TABLE `ingredient_row`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipe` (`recipe`),
  ADD KEY `ingredient` (`ingredient`),
  ADD KEY `measurement` (`measurement`);

--
-- Indexes for table `instruction`
--
ALTER TABLE `instruction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipe` (`recipe`);

--
-- Indexes for table `measurement`
--
ALTER TABLE `measurement`
  ADD PRIMARY KEY (`unit`);

--
-- Indexes for table `nutrition`
--
ALTER TABLE `nutrition`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipe` (`recipe`),
  ADD KEY `ingredient` (`ingredient`);

--
-- Indexes for table `recipe`
--
ALTER TABLE `recipe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `source` (`source`),
  ADD KEY `author` (`author`);

--
-- Indexes for table `site`
--
ALTER TABLE `site`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `author`
--
ALTER TABLE `author`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ingredient`
--
ALTER TABLE `ingredient`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ingredient_row`
--
ALTER TABLE `ingredient_row`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `instruction`
--
ALTER TABLE `instruction`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nutrition`
--
ALTER TABLE `nutrition`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `recipe`
--
ALTER TABLE `recipe`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `site`
--
ALTER TABLE `site`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `author`
--
ALTER TABLE `author`
  ADD CONSTRAINT `author_ibfk_1` FOREIGN KEY (`site`) REFERENCES `site` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `ingredient_row`
--
ALTER TABLE `ingredient_row`
  ADD CONSTRAINT `ingredient_row_ibfk_1` FOREIGN KEY (`recipe`) REFERENCES `recipe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ingredient_row_ibfk_2` FOREIGN KEY (`ingredient`) REFERENCES `ingredient` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `instruction`
--
ALTER TABLE `instruction`
  ADD CONSTRAINT `instruction_ibfk_1` FOREIGN KEY (`recipe`) REFERENCES `recipe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `nutrition`
--
ALTER TABLE `nutrition`
  ADD CONSTRAINT `nutrition_ibfk_2` FOREIGN KEY (`ingredient`) REFERENCES `ingredient` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `nutrition_ibfk_1` FOREIGN KEY (`recipe`) REFERENCES `recipe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `recipe`
--
ALTER TABLE `recipe`
  ADD CONSTRAINT `recipe_ibfk_2` FOREIGN KEY (`author`) REFERENCES `author` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `recipe_ibfk_1` FOREIGN KEY (`source`) REFERENCES `site` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
