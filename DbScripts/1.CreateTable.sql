IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name='Category')
BEGIN
	CREATE TABLE Category(
		CategoryId INT PRIMARY KEY IDENTITY (1,1),
		CategoryName NVARCHAR(100),
	);
END

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'Product')
BEGIN
	CREATE TABLE Product (
		ProductId INT PRIMARY KEY IDENTITY (1,1),
		Name NVARCHAR(100),
		Description NVARCHAR(MAX),
		Price DECIMAL(10,2),
		CategoryId INT FOREIGN KEY REFERENCES Category(CategoryId),
		ImagePath NVARCHAR(500),
		CreatedDate DATETIME DEFAULT GETDATE()
	);
END


