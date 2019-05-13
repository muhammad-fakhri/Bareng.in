-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2019 at 03:18 PM
-- Server version: 10.1.39-MariaDB
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `barengin`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `admin_level` int(11) NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `phone_number` bigint(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `admin_level`, `email`, `password`, `address`, `phone_number`) VALUES
(1, 'Muhammad Fakhri', 3, 'muhammadfakhri301@gmail.com', '43f6d2d917a20a8e2a11514f7bdf794b', 'Bogor aja deh', 81234567899);

-- --------------------------------------------------------

--
-- Table structure for table `halte_lot`
--

CREATE TABLE `halte_lot` (
  `halteId` int(11) NOT NULL,
  `halte_name` varchar(100) NOT NULL,
  `halte_info` text NOT NULL,
  `halte_location` text NOT NULL,
  `halte_lat` int(11) NOT NULL DEFAULT '0',
  `halte_lon` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `halte_lot`
--

INSERT INTO `halte_lot` (`halteId`, `halte_name`, `halte_info`, `halte_location`, `halte_lat`, `halte_lon`) VALUES
(1, 'Halte FMIPA', 'Haltenya ada di FMIPA Coy', '', 0, 0),
(2, 'Halte GWW', 'Haltenya ada di GWW Coy', '', 0, 0),
(3, 'Halte FPIK Biru', 'di FPIK coy', '', 0, 0),
(4, 'Halte Audit FMIPA Hihihhi', 'di audit fmipa coy', '', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_04_29_202646_create_table_park_lot', 1);

-- --------------------------------------------------------

--
-- Table structure for table `park_history`
--

CREATE TABLE `park_history` (
  `history_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `history_date` date NOT NULL,
  `history_time` time NOT NULL,
  `park_lot_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `park_history`
--

INSERT INTO `park_history` (`history_id`, `user_id`, `history_date`, `history_time`, `park_lot_id`) VALUES
(2, 20, '2019-05-12', '00:00:00', 1),
(3, 20, '2019-05-12', '12:21:54', 1),
(4, 0, '2019-05-12', '12:24:47', 2),
(5, 0, '2019-05-12', '12:26:18', 4),
(6, 0, '2019-05-12', '12:28:49', 3),
(7, 20, '2019-05-12', '12:31:01', 7),
(8, 20, '2019-05-12', '12:38:42', 7),
(9, 20, '2019-05-12', '12:44:32', 7);

-- --------------------------------------------------------

--
-- Table structure for table `park_lot`
--

CREATE TABLE `park_lot` (
  `ParkLotId` int(10) UNSIGNED NOT NULL,
  `ParkLotName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ParkLotQuota` int(11) NOT NULL,
  `ParkLotCoor` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ParkLotPosition` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ParkLotAddress` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `park_lot`
--

INSERT INTO `park_lot` (`ParkLotId`, `ParkLotName`, `ParkLotQuota`, `ParkLotCoor`, `ParkLotPosition`, `ParkLotAddress`, `created_at`, `updated_at`) VALUES
(1, 'Graha Widya Wisuda', 249, '-6.559788, 106.730874', 'front', 'Graha Widya Wisuda', '2019-05-12 05:05:09', '2019-04-29 22:29:04'),
(2, 'Gymnasium', 119, '-6.557332, 106.732342', 'front', 'Gymnasium IPB Coy', '2019-05-12 05:24:47', '2019-04-29 22:29:05'),
(3, 'Teaching Lab (Khusus Motor)', 28, '-6.555296, 106.729592', 'back', 'FMIPA COY', '2019-05-12 05:28:49', '2019-04-29 22:29:05'),
(4, 'Fakultas Peternakan', 196, '-6.556247, 106.721957', 'back', 'Perpus IPB COY', '2019-05-12 05:26:18', '2019-04-29 22:29:05'),
(5, 'Masjid Al Hurriyyah', 98, '-6.555701, 106.726104', 'back', 'Masjid IPB Coy', '2019-05-12 05:02:05', '2019-04-29 22:29:05'),
(7, 'FEMA FATETA', 136, '-6.559051, 106.727673', 'front', 'Gedung GWW IPB Dramaga', '2019-05-12 05:44:32', '2019-04-29 23:09:55'),
(8, 'Rektorat IPB', 34, '-6.560232, 106.724233', 'front', 'Rektorat IPB', '2019-05-12 05:09:55', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `license_plate` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `phone_number` varchar(12) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `license_plate`, `address`, `phone_number`) VALUES
(19, 'Muhammad Alifudin', 'alifudin@gmail.com', '43f6d2d917a20a8e2a11514f7bdf794b', 'WKWKWKWK', 'HAHAHAHA', '111122223333'),
(20, 'Muhammad Fakhri', 'muhammadfakhri301@gmail.com', '3c3e175e71a48fa07ff2b2bc45c07895', 'B 1075 UKZ', 'Bogor BCC HH.4, No.1', '081283639734');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `halte_lot`
--
ALTER TABLE `halte_lot`
  ADD PRIMARY KEY (`halteId`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `park_history`
--
ALTER TABLE `park_history`
  ADD PRIMARY KEY (`history_id`);

--
-- Indexes for table `park_lot`
--
ALTER TABLE `park_lot`
  ADD PRIMARY KEY (`ParkLotId`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `halte_lot`
--
ALTER TABLE `halte_lot`
  MODIFY `halteId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `park_history`
--
ALTER TABLE `park_history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `park_lot`
--
ALTER TABLE `park_lot`
  MODIFY `ParkLotId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
