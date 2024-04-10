CREATE TABLE IF NOT EXISTS public."Admin"
(
    "idAdmin" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    phone character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "frusionName" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Admin_pkey" PRIMARY KEY ("idAdmin")
);

CREATE TABLE IF NOT EXISTS public."Box"
(
    "idBox" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "typeBox" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "weightBox" double precision NOT NULL,
    "idAdmin" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Box_pkey" PRIMARY KEY ("idBox")
);

CREATE TABLE IF NOT EXISTS public."Fruit"
(
    "idFruit" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "typeFruit" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "idAdmin" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Fruit_pkey" PRIMARY KEY ("idFruit")
);

CREATE TABLE IF NOT EXISTS public."FruitPrices"
(
    "idPrice" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "idFruit" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    price numeric NOT NULL,
    "dataPrice" date NOT NULL,
    CONSTRAINT "FruitPrices_pkey" PRIMARY KEY ("idPrice")
);

CREATE TABLE IF NOT EXISTS public."Transaction"
(
    "idTransaction" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "idUser" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "idAdmin" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "weightGross" numeric(255, 0) NOT NULL,
    "idBox" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "numberOfBoxes" integer NOT NULL,
    "idPrice" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "transactionDate" date NOT NULL,
    "weightNet" numeric NOT NULL,
    amount numeric NOT NULL,
    "priceFruit" numeric NOT NULL,
    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("idTransaction")
);

CREATE TABLE IF NOT EXISTS public."User"
(
    "idUser" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "firstName" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "lastName" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "idAdmin" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("idUser")
);
END;