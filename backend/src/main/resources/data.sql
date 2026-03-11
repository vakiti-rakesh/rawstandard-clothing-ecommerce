INSERT INTO shirts (id, description, embroidery_design, image_url, price, slug, title) VALUES
(1,'Premium embroidered shirt from Raw Standard. Limited stock.','RS Logo Classic','/products/black-stag-shirt.jpeg',1499.00,'rawstandard-stag-noir-shirt','RAWSTANDARD Stag Noir Shirt'),
(2,'Premium embroidered shirt from Raw Standard. Limited stock.','RS Logo Classic','/products/white-lighthouse-shirt.jpeg',1499.00,'rawstandard-beacon-white-shirt','RAWSTANDARD Beacon White Shirt'),
(3,'Heavy overshirt for everyday wear.','RS Stitch','/products/beige-horse-shirt.jpeg',1699.00,'rawstandard-desert-horse-shirt','RAWSTANDARD Desert Horse Shirt'),
(4,'Clean white polo with embroidered branding.','RS Minimal','/products/white-stag-shirt.jpeg',1299.00,'rawstandard-alpine-stag-shirt','RAWSTANDARD Alpine Stag Shirt'),
(5,'Everyday navy shirt with classic fit.','RS Badge','/products/beige-rider-shirt.jpeg',1499.00,'rawstandard-polo-rider-shirt','RAWSTANDARD Polo Rider Shirt'),
(6,'Minimal beige shirt with premium feel.','RS Thread','/products/white-rider-shirt.jpeg',1399.00,'rawstandard-cavalier-white-shirt','RAWSTANDARD Cavalier White Shirt');

INSERT INTO shirt_sizes (shirt_id, size, stock) VALUES
(1,'S',10),(1,'M',8),(1,'L',6),(1,'XL',5),
(2,'S',12),(2,'M',10),(2,'L',7),(2,'XL',4),
(3,'S',9),(3,'M',8),(3,'L',5),(3,'XL',3),
(4,'S',10),(4,'M',9),(4,'L',6),(4,'XL',4),
(5,'S',11),(5,'M',8),(5,'L',6),(5,'XL',4),
(6,'S',10),(6,'M',7),(6,'L',5),(6,'XL',3);