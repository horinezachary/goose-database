-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 13, 2020 at 03:35 AM
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
-- Table structure for table `abbreviation`
--

CREATE TABLE `abbreviation` (
  `measurement_id` int(4) NOT NULL,
  `abbreviation` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `author`
--

CREATE TABLE `author` (
  `author_id` int(10) NOT NULL,
  `author_name` varchar(50) NOT NULL,
  `site_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `branded_food`
--

CREATE TABLE `branded_food` (
  `fdc_id` int(6) DEFAULT NULL,
  `brand_owner` varchar(35) DEFAULT NULL,
  `gtin_upc` varchar(14) DEFAULT NULL,
  `ingredients` varchar(2229) DEFAULT NULL,
  `serving_size` decimal(4,1) DEFAULT NULL,
  `serving_size_unit` varchar(2) DEFAULT NULL,
  `household_serving_fulltext` varchar(70) DEFAULT NULL,
  `branded_food_category` varchar(72) DEFAULT NULL,
  `data_source` varchar(4) DEFAULT NULL,
  `modified_date` varchar(10) DEFAULT NULL,
  `available_date` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `compounds`
--

CREATE TABLE `compounds` (
  `id` int(11) NOT NULL,
  `legacy_id` int(11) DEFAULT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `public_id` varchar(9) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `export` tinyint(1) DEFAULT '0',
  `state` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `annotation_quality` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` mediumtext COLLATE utf8_unicode_ci,
  `cas_number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `melting_point` mediumtext COLLATE utf8_unicode_ci,
  `protein_formula` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `protein_weight` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `experimental_solubility` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `experimental_logp` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hydrophobicity` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `isoelectric_point` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `metabolism` mediumtext COLLATE utf8_unicode_ci,
  `kegg_compound_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pubchem_compound_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pubchem_substance_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `chebi_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `het_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `uniprot_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `uniprot_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `genbank_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `wikipedia_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `synthesis_citations` mediumtext COLLATE utf8_unicode_ci,
  `general_citations` mediumtext COLLATE utf8_unicode_ci,
  `comments` mediumtext COLLATE utf8_unicode_ci,
  `protein_structure_file_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `protein_structure_content_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `protein_structure_file_size` int(11) DEFAULT NULL,
  `protein_structure_updated_at` datetime DEFAULT NULL,
  `msds_file_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `msds_content_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `msds_file_size` int(11) DEFAULT NULL,
  `msds_updated_at` datetime DEFAULT NULL,
  `creator_id` int(11) DEFAULT NULL,
  `updater_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `phenolexplorer_id` int(11) DEFAULT NULL,
  `dfc_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hmdb_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `duke_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `drugbank_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bigg_id` int(11) DEFAULT NULL,
  `eafus_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `knapsack_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `boiling_point` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `boiling_point_reference` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `charge` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `charge_reference` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `density` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `density_reference` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `optical_rotation` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `optical_rotation_reference` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `percent_composition` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `percent_composition_reference` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `physical_description` mediumtext COLLATE utf8_unicode_ci,
  `physical_description_reference` mediumtext COLLATE utf8_unicode_ci,
  `refractive_index` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `refractive_index_reference` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `uv_index` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `uv_index_reference` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `experimental_pka` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `experimental_pka_reference` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `experimental_solubility_reference` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `experimental_logp_reference` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hydrophobicity_reference` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `isoelectric_point_reference` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `melting_point_reference` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `moldb_alogps_logp` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `moldb_logp` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `moldb_alogps_logs` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `moldb_smiles` mediumtext COLLATE utf8_unicode_ci,
  `moldb_pka` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `moldb_formula` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `moldb_average_mass` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `moldb_inchi` mediumtext COLLATE utf8_unicode_ci,
  `moldb_mono_mass` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `moldb_inchikey` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `moldb_alogps_solubility` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `moldb_id` int(11) DEFAULT NULL,
  `moldb_iupac` mediumtext COLLATE utf8_unicode_ci,
  `structure_source` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `duplicate_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `old_dfc_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dfc_name` mediumtext COLLATE utf8_unicode_ci,
  `compound_source` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `flavornet_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `goodscent_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `superscent_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phenolexplorer_metabolite_id` int(11) DEFAULT NULL,
  `kingdom` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `superklass` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `klass` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `subklass` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `direct_parent` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `molecular_framework` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `chembl_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `chemspider_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `meta_cyc_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `foodcomex` tinyint(1) DEFAULT NULL,
  `phytohub_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `compounds_enzymes`
--

CREATE TABLE `compounds_enzymes` (
  `id` int(11) NOT NULL,
  `compound_id` int(11) NOT NULL,
  `enzyme_id` int(11) NOT NULL,
  `citations` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `creator_id` int(11) DEFAULT NULL,
  `updater_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `compounds_flavors`
--

CREATE TABLE `compounds_flavors` (
  `id` int(11) NOT NULL,
  `compound_id` int(11) NOT NULL,
  `flavor_id` int(11) NOT NULL,
  `citations` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `creator_id` int(11) DEFAULT NULL,
  `updater_id` int(11) DEFAULT NULL,
  `source_id` int(11) DEFAULT NULL,
  `source_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `compounds_health_effects`
--

CREATE TABLE `compounds_health_effects` (
  `id` int(11) NOT NULL,
  `compound_id` int(11) NOT NULL,
  `health_effect_id` int(11) NOT NULL,
  `orig_health_effect_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `orig_compound_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `orig_citation` mediumtext COLLATE utf8_unicode_ci,
  `citation` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `citation_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `creator_id` int(11) DEFAULT NULL,
  `updater_id` int(11) DEFAULT NULL,
  `source_id` int(11) DEFAULT NULL,
  `source_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `compounds_pathways`
--

CREATE TABLE `compounds_pathways` (
  `id` int(11) NOT NULL,
  `compound_id` int(11) DEFAULT NULL,
  `pathway_id` int(11) DEFAULT NULL,
  `creator_id` int(11) DEFAULT NULL,
  `updater_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `compound_alternate_parents`
--

CREATE TABLE `compound_alternate_parents` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `compound_id` int(11) DEFAULT NULL,
  `creator_id` int(11) DEFAULT NULL,
  `updater_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `compound_external_descriptors`
--

CREATE TABLE `compound_external_descriptors` (
  `id` int(11) NOT NULL,
  `external_id` varchar(255) DEFAULT NULL,
  `annotations` varchar(255) DEFAULT NULL,
  `compound_id` int(11) DEFAULT NULL,
  `creator_id` int(11) DEFAULT NULL,
  `updater_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `compound_substituents`
--

CREATE TABLE `compound_substituents` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `compound_id` int(11) DEFAULT NULL,
  `creator_id` int(11) DEFAULT NULL,
  `updater_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `compound_synonyms`
--

CREATE TABLE `compound_synonyms` (
  `id` int(11) NOT NULL,
  `synonym` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `synonym_source` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `source_id` int(11) DEFAULT NULL,
  `source_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contents`
--

CREATE TABLE `contents` (
  `id` int(11) NOT NULL,
  `source_id` int(11) DEFAULT NULL,
  `source_type` varchar(255) DEFAULT NULL,
  `food_id` int(11) NOT NULL,
  `orig_food_id` varchar(255) DEFAULT NULL,
  `orig_food_common_name` varchar(255) DEFAULT NULL,
  `orig_food_scientific_name` varchar(255) DEFAULT NULL,
  `orig_food_part` varchar(255) DEFAULT NULL,
  `orig_source_id` varchar(255) DEFAULT NULL,
  `orig_source_name` varchar(255) DEFAULT NULL,
  `orig_content` decimal(15,9) DEFAULT NULL,
  `orig_min` decimal(15,9) DEFAULT NULL,
  `orig_max` decimal(15,9) DEFAULT NULL,
  `orig_unit` varchar(255) DEFAULT NULL,
  `orig_citation` mediumtext,
  `citation` mediumtext NOT NULL,
  `citation_type` varchar(255) NOT NULL,
  `creator_id` int(11) DEFAULT NULL,
  `updater_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `orig_method` varchar(255) DEFAULT NULL,
  `orig_unit_expression` varchar(255) DEFAULT NULL,
  `standard_content` decimal(15,9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `enzymes`
--

CREATE TABLE `enzymes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `gene_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` mediumtext COLLATE utf8_unicode_ci,
  `go_classification` mediumtext COLLATE utf8_unicode_ci,
  `general_function` mediumtext COLLATE utf8_unicode_ci,
  `specific_function` mediumtext COLLATE utf8_unicode_ci,
  `pathway` mediumtext COLLATE utf8_unicode_ci,
  `reaction` mediumtext COLLATE utf8_unicode_ci,
  `cellular_location` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `signals` mediumtext COLLATE utf8_unicode_ci,
  `transmembrane_regions` mediumtext COLLATE utf8_unicode_ci,
  `molecular_weight` decimal(15,9) DEFAULT NULL,
  `theoretical_pi` decimal(15,9) DEFAULT NULL,
  `locus` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `chromosome` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `uniprot_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `uniprot_id` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pdb_id` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `genbank_protein_id` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `genbank_gene_id` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `genecard_id` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `genatlas_id` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hgnc_id` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hprd_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `organism` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `general_citations` mediumtext COLLATE utf8_unicode_ci,
  `comments` mediumtext COLLATE utf8_unicode_ci,
  `creator_id` int(11) DEFAULT NULL,
  `updater_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `flavors`
--

CREATE TABLE `flavors` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `flavor_group` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `category` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `creator_id` int(11) DEFAULT NULL,
  `updater_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `fdc_id` int(6) NOT NULL DEFAULT '0',
  `data_type` varchar(12) DEFAULT NULL,
  `description` varchar(141) DEFAULT NULL,
  `food_category_id` int(2) DEFAULT NULL,
  `publication_date` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `foodcomex_compounds`
--

CREATE TABLE `foodcomex_compounds` (
  `id` int(11) NOT NULL,
  `compound_id` int(11) NOT NULL,
  `origin` varchar(255) DEFAULT NULL,
  `storage_form` varchar(255) DEFAULT NULL,
  `maximum_quantity` varchar(255) DEFAULT NULL,
  `storage_condition` varchar(255) DEFAULT NULL,
  `contact_name` varchar(255) DEFAULT NULL,
  `contact_address` text,
  `contact_email` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `export` tinyint(1) DEFAULT NULL,
  `purity` text,
  `description` text,
  `spectra_details` varchar(255) DEFAULT NULL,
  `delivery_time` varchar(255) DEFAULT NULL,
  `stability` varchar(255) DEFAULT NULL,
  `admin_user_id` int(11) DEFAULT NULL,
  `public_id` varchar(255) NOT NULL,
  `cas_number` varchar(255) DEFAULT '',
  `taxonomy_class` varchar(255) DEFAULT '',
  `taxonomy_family` varchar(255) DEFAULT '',
  `experimental_logp` varchar(255) DEFAULT '',
  `experimental_solubility` varchar(255) DEFAULT '',
  `melting_point` varchar(255) DEFAULT '',
  `food_of_origin` varchar(255) DEFAULT '',
  `production_method_reference_text` text,
  `production_method_reference_file_name` varchar(255) DEFAULT NULL,
  `production_method_reference_content_type` varchar(255) DEFAULT NULL,
  `production_method_reference_file_size` int(11) DEFAULT NULL,
  `production_method_reference_updated_at` datetime DEFAULT NULL,
  `elemental_formula` varchar(255) DEFAULT '',
  `minimum_quantity` varchar(255) DEFAULT '',
  `quantity_units` varchar(255) DEFAULT '',
  `available_spectra` text,
  `storage_conditions` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `foodcomex_compound_providers`
--

CREATE TABLE `foodcomex_compound_providers` (
  `id` int(11) NOT NULL,
  `foodcomex_compound_id` int(11) NOT NULL,
  `provider_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `foods`
--

CREATE TABLE `foods` (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `name_scientific` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` mediumtext COLLATE utf8_unicode_ci,
  `itis_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `wikipedia_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `picture_file_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `picture_content_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `picture_file_size` int(11) DEFAULT NULL,
  `picture_updated_at` datetime DEFAULT NULL,
  `legacy_id` int(11) DEFAULT NULL,
  `food_group` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `food_subgroup` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `food_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `creator_id` int(11) DEFAULT NULL,
  `updater_id` int(11) DEFAULT NULL,
  `export_to_afcdb` tinyint(1) NOT NULL DEFAULT '0',
  `category` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ncbi_taxonomy_id` int(11) DEFAULT NULL,
  `export_to_foodb` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `food_category`
--

CREATE TABLE `food_category` (
  `id` int(2) NOT NULL,
  `code` int(8) NOT NULL,
  `description` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `food_taxonomies`
--

CREATE TABLE `food_taxonomies` (
  `id` int(11) NOT NULL,
  `food_id` int(11) DEFAULT NULL,
  `ncbi_taxonomy_id` int(11) DEFAULT NULL,
  `classification_name` varchar(255) DEFAULT NULL,
  `classification_order` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `health_effects`
--

CREATE TABLE `health_effects` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` mediumtext COLLATE utf8_unicode_ci,
  `chebi_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `chebi_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `creator_id` int(11) DEFAULT NULL,
  `updater_id` int(11) DEFAULT NULL,
  `chebi_definition` text COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ingredient`
--

CREATE TABLE `ingredient` (
  `ingredient_id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `ingredient_row`
--

CREATE TABLE `ingredient_row` (
  `ingredient_row_id` int(10) NOT NULL,
  `recipe_id` int(10) NOT NULL,
  `list_order` int(2) NOT NULL,
  `size` float NOT NULL,
  `variance` float DEFAULT NULL,
  `measurement_id` int(4) DEFAULT NULL,
  `ingredient_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `instruction`
--

CREATE TABLE `instruction` (
  `instruction_id` int(10) NOT NULL,
  `recipe_id` int(10) NOT NULL,
  `step` int(2) NOT NULL,
  `text` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `measurement`
--

CREATE TABLE `measurement` (
  `measurement_id` int(4) NOT NULL,
  `unit` varchar(12) NOT NULL,
  `category` varchar(10) NOT NULL DEFAULT 'unit',
  `base_size` float(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `nutrients`
--

CREATE TABLE `nutrients` (
  `id` int(11) NOT NULL,
  `legacy_id` int(11) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `public_id` varchar(9) NOT NULL,
  `name` varchar(255) NOT NULL,
  `export` tinyint(1) DEFAULT '0',
  `state` varchar(255) DEFAULT NULL,
  `annotation_quality` varchar(255) DEFAULT NULL,
  `description` mediumtext,
  `wikipedia_id` varchar(255) DEFAULT NULL,
  `comments` mediumtext,
  `dfc_id` varchar(255) DEFAULT NULL,
  `duke_id` varchar(255) DEFAULT NULL,
  `eafus_id` varchar(255) DEFAULT NULL,
  `dfc_name` mediumtext,
  `compound_source` varchar(255) DEFAULT NULL,
  `metabolism` mediumtext,
  `synthesis_citations` mediumtext,
  `general_citations` mediumtext,
  `creator_id` int(11) DEFAULT NULL,
  `updater_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `nutrition`
--

CREATE TABLE `nutrition` (
  `nutrition_id` int(10) NOT NULL,
  `recipe_id` int(10) DEFAULT NULL COMMENT 'only linked to recipe OR ingredient',
  `ingredient_id` int(10) DEFAULT NULL COMMENT 'only linked to recipe OR ingredient',
  `calories` int(4) NOT NULL,
  `serving_size` varchar(100) NOT NULL,
  `total_carbs` int(3) NOT NULL COMMENT 'composite',
  `dietary_fiber` int(3) NOT NULL,
  `sugars` int(3) NOT NULL,
  `total_fat` int(3) NOT NULL,
  `saturated_fat` int(3) NOT NULL,
  `trans_fat` int(3) NOT NULL,
  `sodium` int(3) NOT NULL,
  `vitamins_minerals` int(6) NOT NULL COMMENT 'another table?'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `pathways`
--

CREATE TABLE `pathways` (
  `id` int(11) NOT NULL,
  `smpdb_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `kegg_map_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recipe`
--

CREATE TABLE `recipe` (
  `recipe_id` int(10) NOT NULL,
  `site_id` int(6) DEFAULT NULL,
  `url` varchar(1000) NOT NULL,
  `title` varchar(100) NOT NULL,
  `author_id` int(10) DEFAULT NULL,
  `cook_time` varchar(20) DEFAULT NULL,
  `prep_time` varchar(20) DEFAULT NULL,
  `yield` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `references`
--

CREATE TABLE `references` (
  `id` int(11) NOT NULL,
  `ref_type` varchar(255) DEFAULT NULL,
  `text` text,
  `pubmed_id` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `creator_id` int(11) DEFAULT NULL,
  `updater_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `source_id` int(11) DEFAULT NULL,
  `source_type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `site`
--

CREATE TABLE `site` (
  `site_id` int(10) NOT NULL,
  `base_url` varchar(50) NOT NULL,
  `site_title` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `abbreviation`
--
ALTER TABLE `abbreviation`
  ADD KEY `measurement_id` (`measurement_id`);

--
-- Indexes for table `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`author_id`),
  ADD KEY `site` (`site_id`);

--
-- Indexes for table `branded_food`
--
ALTER TABLE `branded_food`
  ADD KEY `fdc_id` (`fdc_id`);

--
-- Indexes for table `compounds`
--
ALTER TABLE `compounds`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `index_compounds_on_public_id` (`public_id`),
  ADD UNIQUE KEY `index_compounds_on_name` (`name`),
  ADD UNIQUE KEY `index_compounds_on_name_and_public_id` (`name`,`public_id`);

--
-- Indexes for table `compounds_enzymes`
--
ALTER TABLE `compounds_enzymes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `index_compounds_enzymes_on_compound_id_and_enzyme_id` (`compound_id`,`enzyme_id`),
  ADD KEY `enzyme_id` (`enzyme_id`);

--
-- Indexes for table `compounds_flavors`
--
ALTER TABLE `compounds_flavors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `index_compounds_flavors_on_compound_id_and_flavor_id` (`compound_id`,`flavor_id`),
  ADD KEY `index_compounds_flavors_on_source_id_and_source_type` (`source_id`,`source_type`),
  ADD KEY `flavor_id` (`flavor_id`);

--
-- Indexes for table `compounds_health_effects`
--
ALTER TABLE `compounds_health_effects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_compounds_health_effects_on_source_id_and_source_type` (`source_id`,`source_type`),
  ADD KEY `health_effect_id` (`health_effect_id`),
  ADD KEY `compound_id` (`compound_id`);

--
-- Indexes for table `compounds_pathways`
--
ALTER TABLE `compounds_pathways`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_compounds_pathways_on_compound_id` (`compound_id`),
  ADD KEY `index_compounds_pathways_on_pathway_id` (`pathway_id`);

--
-- Indexes for table `compound_alternate_parents`
--
ALTER TABLE `compound_alternate_parents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_compound_alternate_parents_on_compound_id` (`compound_id`);

--
-- Indexes for table `compound_external_descriptors`
--
ALTER TABLE `compound_external_descriptors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_compound_external_descriptors_on_compound_id` (`compound_id`);

--
-- Indexes for table `compound_substituents`
--
ALTER TABLE `compound_substituents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_compound_substituents_on_compound_id` (`compound_id`);

--
-- Indexes for table `compound_synonyms`
--
ALTER TABLE `compound_synonyms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `index_compound_synonyms_on_synonym` (`synonym`),
  ADD KEY `index_compound_synonyms_on_source_id_and_source_type` (`source_id`,`source_type`);

--
-- Indexes for table `contents`
--
ALTER TABLE `contents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `content_source_and_food_index` (`source_id`,`source_type`,`food_id`),
  ADD KEY `food_id` (`food_id`);

--
-- Indexes for table `enzymes`
--
ALTER TABLE `enzymes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `index_enzymes_on_name` (`name`),
  ADD UNIQUE KEY `index_enzymes_on_gene_name` (`gene_name`),
  ADD UNIQUE KEY `index_enzymes_on_uniprot_name` (`uniprot_name`),
  ADD UNIQUE KEY `index_enzymes_on_uniprot_id` (`uniprot_id`),
  ADD UNIQUE KEY `index_enzymes_on_pdb_id` (`pdb_id`),
  ADD UNIQUE KEY `index_enzymes_on_genbank_protein_id` (`genbank_protein_id`),
  ADD UNIQUE KEY `index_enzymes_on_genbank_gene_id` (`genbank_gene_id`),
  ADD UNIQUE KEY `index_enzymes_on_genecard_id` (`genecard_id`),
  ADD UNIQUE KEY `index_enzymes_on_genatlas_id` (`genatlas_id`),
  ADD UNIQUE KEY `index_enzymes_on_hgnc_id` (`hgnc_id`),
  ADD UNIQUE KEY `index_enzymes_on_hprd_id` (`hprd_id`);

--
-- Indexes for table `flavors`
--
ALTER TABLE `flavors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `index_flavors_on_name` (`name`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`fdc_id`),
  ADD KEY `food_category_id` (`food_category_id`);

--
-- Indexes for table `foodcomex_compounds`
--
ALTER TABLE `foodcomex_compounds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_foodcomex_compounds_on_compound_id` (`compound_id`),
  ADD KEY `index_foodcomex_compounds_on_admin_user_id` (`admin_user_id`);

--
-- Indexes for table `foodcomex_compound_providers`
--
ALTER TABLE `foodcomex_compound_providers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_foodcomex_compound_providers_on_foodcomex_compound_id` (`foodcomex_compound_id`),
  ADD KEY `index_foodcomex_compound_providers_on_provider_id` (`provider_id`);

--
-- Indexes for table `foods`
--
ALTER TABLE `foods`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `index_foods_on_name` (`name`),
  ADD KEY `index_foods_on_name_scientific` (`name_scientific`),
  ADD KEY `index_foods_on_export_to_afcdb` (`export_to_afcdb`);

--
-- Indexes for table `food_category`
--
ALTER TABLE `food_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `food_taxonomies`
--
ALTER TABLE `food_taxonomies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `food_id` (`food_id`);

--
-- Indexes for table `health_effects`
--
ALTER TABLE `health_effects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `index_health_effects_on_name` (`name`),
  ADD KEY `index_health_effects_on_chebi_name` (`chebi_name`),
  ADD KEY `index_health_effects_on_chebi_id` (`chebi_id`);

--
-- Indexes for table `ingredient`
--
ALTER TABLE `ingredient`
  ADD PRIMARY KEY (`ingredient_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `ingredient_row`
--
ALTER TABLE `ingredient_row`
  ADD PRIMARY KEY (`ingredient_row_id`),
  ADD KEY `recipe` (`recipe_id`),
  ADD KEY `ingredient` (`ingredient_id`),
  ADD KEY `measurement` (`measurement_id`);

--
-- Indexes for table `instruction`
--
ALTER TABLE `instruction`
  ADD PRIMARY KEY (`instruction_id`),
  ADD KEY `recipe` (`recipe_id`);

--
-- Indexes for table `measurement`
--
ALTER TABLE `measurement`
  ADD PRIMARY KEY (`measurement_id`),
  ADD UNIQUE KEY `unit` (`unit`,`category`);

--
-- Indexes for table `nutrients`
--
ALTER TABLE `nutrients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `index_nutrients_on_name` (`name`),
  ADD UNIQUE KEY `index_nutrients_on_public_id` (`public_id`),
  ADD UNIQUE KEY `index_nutrients_on_name_and_public_id` (`name`,`public_id`);

--
-- Indexes for table `nutrition`
--
ALTER TABLE `nutrition`
  ADD PRIMARY KEY (`nutrition_id`),
  ADD KEY `recipe` (`recipe_id`),
  ADD KEY `ingredient` (`ingredient_id`);

--
-- Indexes for table `pathways`
--
ALTER TABLE `pathways`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recipe`
--
ALTER TABLE `recipe`
  ADD PRIMARY KEY (`recipe_id`),
  ADD KEY `source` (`site_id`),
  ADD KEY `author` (`author_id`);

--
-- Indexes for table `references`
--
ALTER TABLE `references`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_references_on_source_type_and_source_id` (`source_type`,`source_id`);

--
-- Indexes for table `site`
--
ALTER TABLE `site`
  ADD PRIMARY KEY (`site_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `author`
--
ALTER TABLE `author`
  MODIFY `author_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `compounds`
--
ALTER TABLE `compounds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `compounds_enzymes`
--
ALTER TABLE `compounds_enzymes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `compounds_flavors`
--
ALTER TABLE `compounds_flavors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `compounds_health_effects`
--
ALTER TABLE `compounds_health_effects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `compounds_pathways`
--
ALTER TABLE `compounds_pathways`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `compound_alternate_parents`
--
ALTER TABLE `compound_alternate_parents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `compound_external_descriptors`
--
ALTER TABLE `compound_external_descriptors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `compound_substituents`
--
ALTER TABLE `compound_substituents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `compound_synonyms`
--
ALTER TABLE `compound_synonyms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contents`
--
ALTER TABLE `contents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `enzymes`
--
ALTER TABLE `enzymes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `flavors`
--
ALTER TABLE `flavors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `foodcomex_compounds`
--
ALTER TABLE `foodcomex_compounds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `foodcomex_compound_providers`
--
ALTER TABLE `foodcomex_compound_providers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `foods`
--
ALTER TABLE `foods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `food_category`
--
ALTER TABLE `food_category`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `food_taxonomies`
--
ALTER TABLE `food_taxonomies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `health_effects`
--
ALTER TABLE `health_effects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ingredient`
--
ALTER TABLE `ingredient`
  MODIFY `ingredient_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ingredient_row`
--
ALTER TABLE `ingredient_row`
  MODIFY `ingredient_row_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `instruction`
--
ALTER TABLE `instruction`
  MODIFY `instruction_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `measurement`
--
ALTER TABLE `measurement`
  MODIFY `measurement_id` int(4) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nutrients`
--
ALTER TABLE `nutrients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nutrition`
--
ALTER TABLE `nutrition`
  MODIFY `nutrition_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pathways`
--
ALTER TABLE `pathways`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `recipe`
--
ALTER TABLE `recipe`
  MODIFY `recipe_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `references`
--
ALTER TABLE `references`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `site`
--
ALTER TABLE `site`
  MODIFY `site_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `abbreviation`
--
ALTER TABLE `abbreviation`
  ADD CONSTRAINT `abbreviation_ibfk_1` FOREIGN KEY (`measurement_id`) REFERENCES `measurement` (`measurement_id`) ON UPDATE CASCADE;

--
-- Constraints for table `author`
--
ALTER TABLE `author`
  ADD CONSTRAINT `author_ibfk_1` FOREIGN KEY (`site_id`) REFERENCES `site` (`site_id`) ON UPDATE CASCADE;

--
-- Constraints for table `branded_food`
--
ALTER TABLE `branded_food`
  ADD CONSTRAINT `branded_food_ibfk_1` FOREIGN KEY (`fdc_id`) REFERENCES `food` (`fdc_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `ingredient_row`
--
ALTER TABLE `ingredient_row`
  ADD CONSTRAINT `ingredient_row_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ingredient_row_ibfk_2` FOREIGN KEY (`measurement_id`) REFERENCES `measurement` (`measurement_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `ingredient_row_ibfk_3` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`ingredient_id`) ON UPDATE CASCADE;

--
-- Constraints for table `instruction`
--
ALTER TABLE `instruction`
  ADD CONSTRAINT `instruction_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `nutrition`
--
ALTER TABLE `nutrition`
  ADD CONSTRAINT `nutrition_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `nutrition_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`ingredient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `recipe`
--
ALTER TABLE `recipe`
  ADD CONSTRAINT `recipe_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `author` (`author_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `recipe_ibfk_3` FOREIGN KEY (`site_id`) REFERENCES `site` (`site_id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
