-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://github.com/pgadmin-org/pgadmin4/issues/new/choose if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public.admins
(
    id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    frusion_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Admin_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.boxes
(
    id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    weight double precision NOT NULL,
    admin_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    archived boolean NOT NULL,
    CONSTRAINT "Box_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.fruits
(
    id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    admin_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    archived boolean NOT NULL,
    price numeric NOT NULL,
    CONSTRAINT "Fruit_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.transactions
(
    id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    user_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    admin_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    weight_gross numeric(255, 0) NOT NULL,
    box_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    number_of_boxes integer NOT NULL,
    transaction_date date NOT NULL,
    weight_net numeric NOT NULL,
    amount numeric NOT NULL,
    "priceFruit" numeric NOT NULL,
    CONSTRAINT "Transaction_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.users
(
    id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    first_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    admin_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    archived boolean NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY (id)
);
END;