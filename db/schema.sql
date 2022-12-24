DROP DATABASE IF EXISTS BLOG_CMS_db;

CREATE DATABASE BLOG_CMS_db;

USE BLOG_CMS_db;

create table user
(
    id          integer not null auto_increment,
    username    varchar(50) not null,
    password    varchar(50) not null,
    primary key (id)
);

