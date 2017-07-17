CREATE TABLE `orders` (
 `id` int(32) unsigned NOT NULL AUTO_INCREMENT,
 `whether_complete` tinyint(2) unsigned DEFAULT '0',
 `customer` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
 `salesman_id` int(6) unsigned NOT NULL,
 `product_a` int(16) unsigned DEFAULT '0',
 `product_b` int(16) unsigned DEFAULT '0',
 `product_c` int(16) unsigned DEFAULT '0',
 `product_d` int(16) unsigned DEFAULT '0',
 `order_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
 `limit_date` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
 `finish_date` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
 PRIMARY KEY (`id`),
 KEY `salesman_id` (`salesman_id`),
 CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`salesman_id`) REFERENCES `salesman` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000000 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci

CREATE TABLE `productadmin` (
 `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
 `name` varchar(63) COLLATE utf8_unicode_ci DEFAULT NULL,
 `gender` tinyint(1) unsigned DEFAULT NULL,
 `tel` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
 `email` varchar(63) COLLATE utf8_unicode_ci DEFAULT NULL,
 `icon` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
 `password` varchar(18) COLLATE utf8_unicode_ci NOT NULL,
 `question1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
 `answer1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
 PRIMARY KEY (`id`),
 KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=100000 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci

CREATE TABLE `salesman` (
 `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
 `name` varchar(63) COLLATE utf8_unicode_ci DEFAULT NULL,
 `gender` tinyint(1) unsigned DEFAULT NULL,
 `tel` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
 `email` varchar(63) COLLATE utf8_unicode_ci DEFAULT NULL,
 `icon` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
 `password` varchar(18) COLLATE utf8_unicode_ci NOT NULL,
 `question1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
 `answer1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=200000 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci

CREATE TABLE `store` (
 `id` int(32) unsigned NOT NULL AUTO_INCREMENT,
 `producer_id` int(6) unsigned DEFAULT NULL,
 `sign` tinyint(2) unsigned NOT NULL DEFAULT '0',
 `change_a` int(16) unsigned NOT NULL DEFAULT '0',
 `change_b` int(16) unsigned NOT NULL DEFAULT '0',
 `change_c` int(16) unsigned NOT NULL DEFAULT '0',
 `change_d` int(16) unsigned NOT NULL DEFAULT '0',
 `product_a` int(16) unsigned NOT NULL DEFAULT '0',
 `product_b` int(16) unsigned NOT NULL DEFAULT '0',
 `product_c` int(16) unsigned NOT NULL DEFAULT '0',
 `product_d` int(16) unsigned NOT NULL DEFAULT '0',
 `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`),
 KEY `producer_id` (`producer_id`),
 CONSTRAINT `store_ibfk_1` FOREIGN KEY (`producer_id`) REFERENCES `worker` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000000 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci

CREATE TABLE `warehouseman` (
 `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
 `name` varchar(63) COLLATE utf8_unicode_ci DEFAULT NULL,
 `gender` tinyint(1) unsigned DEFAULT NULL,
 `tel` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
 `email` varchar(63) COLLATE utf8_unicode_ci DEFAULT NULL,
 `icon` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
 `password` varchar(18) COLLATE utf8_unicode_ci NOT NULL,
 `question1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
 `answer1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=300000 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci

CREATE TABLE `worker` (
 `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
 `name` varchar(63) COLLATE utf8_unicode_ci DEFAULT NULL,
 `gender` tinyint(1) unsigned DEFAULT NULL,
 `tel` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
 `email` varchar(63) COLLATE utf8_unicode_ci DEFAULT NULL,
 `icon` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
 `password` varchar(18) COLLATE utf8_unicode_ci NOT NULL,
 `question1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
 `answer1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=400000 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci