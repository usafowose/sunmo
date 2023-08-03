

-- PROFILES
-- profileId primary key (not null?) (server-generated and extremely low chance of interesction)
-- familyId: foreign key (not null)
-- userId: foreign key to Users table pk
-- email: string, email-validated data type
-- displayName: character-limited name displayed on profile (defaulted as Firstname Lastname)
-- userName: character-limited string (under display name) set a defualt value of firstName.concat(lastname)
-- firstName: not null...data types
-- lastName: nto null...data types
-- icon: string (either relative URL or a string representing a library's icon)
-- city: string
-- country: country code


-- USERS
-- userID: primary key to PROFILES fk 
-- email: string, email-validated data type
-- password: find an efficient way to store PW in DB

CREATE TABLE profiles
(
  id INT AUTO_INCREMENT PRIMARY KEY,
  family_id INT NOT NULL,
  user_id INT,
  email VARCHAR(255) NOT NULL,
  display_name VARCHAR(63) NOT NULL,
  user_name VARCHAR(63) NOT NULL,
  first_name VARCHAR(63) NOT NULL,
  last_name VARCHAR(63) NOT NULL,
  city VARCHAR(63),
  country VARCHAR(63),
  icon VARCHAR(255),
  INDEX idx_email (email),
  INDEX idx_first_name (first_name),
  INDEX idx_last_name (last_name),
  -- FOREIGN KEY (family_id) REFERENCES families(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE users
(
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(63) NOT NULL,
  last_name VARCHAR(63) NOT NULL,
  birthday 
  city VARCHAR(63),
  country VARCHAR(63),
  phone_number VARCHAR(20),
  registered BOOLEAN,
  INDEX idx_email (email)
);

