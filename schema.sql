CREATE TABLE public."Roles"
(
  id integer NOT NULL DEFAULT nextval('"Roles_id_seq"'::regclass),
  title character varying(255) COLLATE pg_catalog."default" NOT NULL,
  "createdAt" timestamp with time zone NOT NULL,
  "updatedAt" timestamp with time zone NOT NULL,
  CONSTRAINT "Roles_pkey" PRIMARY KEY (id),
  CONSTRAINT "Roles_title_key" UNIQUE (title)
)

CREATE TABLE public."Users"
(
  id integer NOT NULL DEFAULT nextval('"Users_id_seq"'::regclass),
  "firstName" character varying(255) COLLATE pg_catalog."default" NOT NULL,
  "lastName" character varying(255) COLLATE pg_catalog."default" NOT NULL,
  password character varying(255) COLLATE pg_catalog."default" NOT NULL,
  "roleId" integer NOT NULL,
  email character varying(255) COLLATE pg_catalog."default",
  "createdAt" timestamp with time zone NOT NULL,
  "updatedAt" timestamp with time zone NOT NULL,
  CONSTRAINT "Users_pkey" PRIMARY KEY (id),
  CONSTRAINT "Users_email_key" UNIQUE (email),
  CONSTRAINT "Users_roleId_fkey" FOREIGN KEY ("roleId")
      REFERENCES public."Roles" (id) MATCH SIMPLE
      ON UPDATE CASCADE
      ON DELETE CASCADE
)

CREATE TABLE public."Documents"
(
  id integer NOT NULL DEFAULT nextval('"Documents_id_seq"'::regclass),
  title character varying(255) COLLATE pg_catalog."default" NOT NULL,
  content text COLLATE pg_catalog."default" NOT NULL,
  access character varying(255) COLLATE pg_catalog."default" NOT NULL,
  "ownerId" integer NOT NULL,
  "createdAt" timestamp with time zone NOT NULL,
  "updatedAt" timestamp with time zone NOT NULL,
  CONSTRAINT "Documents_pkey" PRIMARY KEY (id),
  CONSTRAINT "Documents_ownerId_fkey" FOREIGN KEY ("ownerId")
      REFERENCES public."Users" (id) MATCH SIMPLE
      ON UPDATE CASCADE
      ON DELETE NO ACTION
)