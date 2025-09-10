INSERT INTO Category (CategoryName)
	SELECT v.CategoryName
	FROM (VALUES('Electronics'), ('Clothing'), ('Toy'), ('Cosmetic')) v(CategoryName)
	WHERE NOT EXISTS(
		SELECT 1 
		FROM Category c 
		WHERE v.CategoryName = c.CategoryName
);
--hello