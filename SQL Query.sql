create database MedicalInventory;
use MedicalInventory;
create table Medicine
(
id int not null primary key auto_increment,
medName varchar(80) not null ,
totalCount int ,
brandName varchar(50) not null
)    ;
 
 desc Medicine ;

insert into Medicine(id,medName,totalCount,brandName) values(1,'Combiflam',507 ,'CFM');

select * from Medicine   ;

