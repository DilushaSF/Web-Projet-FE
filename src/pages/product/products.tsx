import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageLayout from "../layout/pageLayout";
import { Button, Box, Typography } from "@mui/material";
import type { Product } from "../context/cartContext";
// import { getByProductsFilter } from "@/services/productService";
import { useSearchParams } from "react-router-dom";
import { ProductGrid } from "../../components/productGrid";
import { brandNames, categoryNames } from "../../utils/consts";

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [brandId, setBrandId] = useState<number | null>(null);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await getByProductsFilter(
          category ? parseInt(category, 10) : 0,
          brand ? parseInt(brand, 10) : 0,
          0
        );
        setFilteredProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category, brand]);

  return (
    <PageLayout>
      <Box
        sx={{
          width: "100%",
          height: 320,
          bgcolor: "#0A1E38",
          mb: 10,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Typography variant="h3" sx={{ color: "white", mb: 2 }}>
              {/* {getCategoryName()} */}
            </Typography>
            <Typography sx={{ color: "#D3D3D3", maxWidth: 960, mx: "auto" }}>
              {/* Browse our selection of {getBrandName()} {getCategoryName()}{" "} */}
              players
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", mt: 4, gap: 2 }}
            >
              <Button
                sx={{
                  bgcolor: "#C39D63",
                  color: "black",
                  "&:hover": { bgcolor: "#A67B3D" },
                }}
                onClick={() => navigate("/category-selection")}
              >
                Change Category
              </Button>
              <Button
                sx={{
                  bgcolor: "#C39D63",
                  color: "black",
                  "&:hover": { bgcolor: "#A67B3D" },
                }}
                //    TODO: Add onClick function
              >
                Change Brand
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Button
        variant="text"
        sx={{ mb: 4, color: "#0A1E38", "&:hover": { color: "#145DA0" } }}
        onClick={() => navigate(-1)}
      >
        Back to Brands
      </Button>
      <Box sx={{ px: 4, py: 8 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ color: "#0A1E38", mb: 1 }}>
            {/* {getCategoryName()} - {getBrandName()} */}
          </Typography>
          <Typography sx={{ color: "#718096" }}>
            {/* {filteredProducts.length} products found */}
          </Typography>
        </Box>

        {/* <ProductGrid
        //   products={filteredProductData || []}
          isLoading={isLoading}
        /> */}
      </Box>
    </PageLayout>
  );
};

export default Products;
