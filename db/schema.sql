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

create table post
(
    id      integer not null auto_increment,
    title   varchar(100) not null,
    content varchar(200) not null,
    createdat   datetime not null default CURRENT_TIMESTAMP,
    user_id integer not null,
    FOREIGN KEY (user_id) REFERENCES user(id),
    primary key (id)
);