CREATE TABLE public."roles"
(
  id integer PRIMARY KEY,
  title character varying(255) NOT NULL,
  createdAt timestamp with time zone NOT NULL,
  updatedAt timestamp with time zone NOT NULL
);

CREATE TABLE public."users"
(
  id integer PRIMARY KEY,
  firstName character varying(255) NOT NULL,
  lastName character varying(255) NOT NULL,
  email character varying(255) NOT NULL,
  username character varying(255) NOT NULL,
  password character varying(255) NOT NULL,
  createdAt timestamp with time zone NOT NULL,
  updatedAt timestamp with time zone NOT NULL,
  roleId integer REFERENCES "roles" ON DELETE CASCADE DEFAULT 2
);

CREATE TABLE public."documents"
(
  id integer PRIMARY KEY,
  title character varying(255) NOT NULL,
  content text NOT NULL,
  public boolean DEFAULT false,
  createdAt timestamp with time zone NOT NULL,
  updatedAt timestamp with time zone NOT NULL,
  roleId integer REFERENCES "roles" ON DELETE CASCADE,
  ownerId integer REFERENCES "users" ON DELETE CASCADE
);