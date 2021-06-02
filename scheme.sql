\c mvi;

create table users (id bigserial primary key, username char(30), passw char(60), premium boolean default false, token char(38));
create table projects (id bigserial primary key, user_id bigint, file_link text);

alter table projects add foreign key (user_id) references users (id) on update cascade on delete cascade;