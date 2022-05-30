import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { CustomerListResults } from "../components/customers/CustomerListResults";
import { CustomerListToolbar } from "../components/customers/CustomerListToolbar";
import { customers } from "../__mocks__/customers";

export function Customers() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ mt: 3 }}>
          <CustomerListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  );
}