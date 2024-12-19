-- CreateTable
CREATE TABLE `tasks` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `count_calls` INTEGER NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `statuses` (
    `statuse_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_statuse` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`statuse_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

create table doctors
(
    id    int auto_increment
        primary key,
    name  varchar(255) not null,
    spec  varchar(255) not null,
    price int          not null
);

create index doctors_id_price_index
    on doctors (id, price);

create table patients
(
    id     int auto_increment
        primary key,
    phone  varchar(255) not null,
    name   varchar(255) not null,
    email  varchar(255) not null,
    gender char(20)     not null
);

create table schedule
(
    id         int auto_increment
        primary key,
    doctor_id  int        not null,
    date       date       not null,
    time_from  time       not null,
    time_to    time       not null,
    is_free    tinyint(1) not null,
    patient_id int        null,
    type       int        null,
    constraint schedule_id_uindex
        unique (id),
    constraint `schedule__doctors.id_fk`
        foreign key (doctor_id) references doctors (id),
    constraint schedule__id_fk
        foreign key (patient_id) references patients (id)
);


