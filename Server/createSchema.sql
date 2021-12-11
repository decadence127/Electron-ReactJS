CREATE SCHEMA "customsSchema";
CREATE SEQUENCE "customsSchema"."Users_seq";
CREATE SEQUENCE "customsSchema"."Cart_seq";
CREATE SEQUENCE "customsSchema"."DeclaredUnit_seq";
CREATE SEQUENCE "customsSchema"."UnitCategory_seq";
CREATE SEQUENCE "customsSchema"."CustomsCategory_seq";
CREATE SEQUENCE "customsSchema"."UnitDesc_seq";

CREATE TABLE "customsSchema"."Cart"
(
    "Id" int NOT NULL DEFAULT NEXTVAL('"customsSchema"."Cart_seq"'),
    PRIMARY KEY ("Id")
);

CREATE TABLE "customsSchema"."Users"
(
    "Id"       int          NOT NULL DEFAULT NEXTVAL('"customsSchema"."Users_seq"'),
    "Email"    varchar(255) NOT NULL UNIQUE,
    "Login"    varchar(32)  NOT NULL,
    "Password" varchar(32)  NOT NULL,
    "Name"     varchar(32)  NULL,
    "Banned"   boolean      NOT NULL default false,
    "Role"     int          NOT NULL,
    "CartId"   int          NULL,
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("CartId") REFERENCES "customsSchema"."Cart" ("Id") ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE "customsSchema"."CustomsCategory"
(
    "Id"            int          NOT NULL DEFAULT NEXTVAL('"customsSchema"."UnitCategory_seq"'),
    "Category"      varchar(255) NULL,
    "TaxPercentage" int          NULL,
    PRIMARY KEY ("Id")
);
CREATE TABLE "customsSchema"."UnitDesc"
(
    "Id"          int          NOT NULL DEFAULT NEXTVAL('"customsSchema"."UnitDesc_seq"'),
    "Description" varchar(255) NULL,
    "ArrivalDate" timestamp(0) NOT NULL default CURRENT_TIMESTAMP,
    PRIMARY KEY ("Id")
);

CREATE TABLE "customsSchema"."DeclaredUnit"
(
    "Id"         int            NOT NULL DEFAULT NEXTVAL('"customsSchema"."DeclaredUnit_seq"'),
    "TaxValue"   decimal(10, 2) NULL,
    "UnitTitle"  varchar(255)   NULL,
    "CartId"     int            NULL,
    "UnitDescId" int            NULL,
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("CartId") REFERENCES "customsSchema"."Cart" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY ("UnitDescId") REFERENCES "customsSchema"."UnitDesc" ("Id") ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE "customsSchema"."UnitCategoryRelation"
(
    "Id"         int NOT NULL DEFAULT NEXTVAL('"customsSchema"."CustomsCategory_seq"'),
    "UnitId"     int NULL,
    "CategoryId" int NULL,
    PRIMARY KEY ("Id"),
    FOREIGN KEY ("UnitId") REFERENCES "customsSchema"."DeclaredUnit" ("Id") ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY ("CategoryId") REFERENCES "customsSchema"."CustomsCategory" ("Id") ON UPDATE CASCADE ON DELETE RESTRICT
);

