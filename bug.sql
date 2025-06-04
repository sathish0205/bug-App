-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 04, 2025 at 07:38 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bug`
--

-- --------------------------------------------------------

--
-- Table structure for table `bugs`
--

CREATE TABLE `bugs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `severity` enum('Low','Medium','High','Critical') DEFAULT NULL,
  `status` enum('Open','In Progress','Resolved','Closed') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bugs`
--

INSERT INTO `bugs` (`id`, `title`, `description`, `severity`, `status`) VALUES
(15, 'Misaligned Button on Mobile View', 'On screens smaller than 768px, the submit button is not centered and overlaps with adjacent content. Occurs on both Chrome and Safari.', 'Critical', 'Open'),
(16, 'Sidebar Navigation Links Not Workings', 'Clicking on sidebar links doesn’t redirect to the respective page. Console shows \"Cannot read property \'push\' of undefined', 'Medium', 'In Progress'),
(17, 'App Crashes When Visiting Dashboard', 'Navigating to /dashboard throws a runtime error: TypeError: Cannot read properties of null (reading \'map\').', 'High', 'Resolved'),
(18, 'Form Submission Returns 500 Error', 'When submitting the signup form, the server responds with a 500 Internal Server Error. Happens with valid data as well.', 'Critical', 'Resolved'),
(19, 'Toast Notifications Not Showing on Action', 'Expected a success toast after form submission, but nothing appears. Toaster is mounted, and toast.success() is being called.', 'Critical', 'Closed'),
(20, 'Toggle Switch Does Not Update State Correctly', 'Toggling the switch shows visual change, but state value remains false. Verified via React Developer Tools.', 'Critical', 'In Progress'),
(21, 'Iconify Icons Not Rendering on Page', 'Imported icons from @iconify/react are not displaying. DevTools shows 404 for icon fonts or SVG paths.', 'High', 'Resolved'),
(22, 'API Data Not Rendering in List Component', 'The useEffect hook fetches data but the component doesn\'t update. console.log(data) returns valid JSON but UI stays empty.', 'Low', 'In Progress'),
(23, 'Tailwind CSS Styles Not Applying on Build', 'Styles work in development but disappear after building with npm run build. Possibly due to missing purge configuration.', 'High', 'Open');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bugs`
--
ALTER TABLE `bugs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bugs`
--
ALTER TABLE `bugs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
