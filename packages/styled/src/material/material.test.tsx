import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from '../button';
import {
  AppBar,
  Autocomplete,
  Box,
  ButtonGroup,
  Chip,
  Container,
  Grid,
  Link,
  List,
  Paper,
  Rating,
  Snackbar,
  Stack,
  SvgIcon,
  Table,
  Typography,
} from './index';

describe('Material parity styled components', () => {
  it('renders exported components', () => {
    render(
      <Container maxWidth={false} disableGutters>
        <AppBar>Navigation</AppBar>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Box display="grid" padding={2}>
            Box
          </Box>
          <Grid columns={2}>
            <Paper variant="outlined" square>
              Paper
            </Paper>
            <Typography variant="h6" align="center" color="primary" gutterBottom>
              Heading
            </Typography>
          </Grid>
          <ButtonGroup variant="contained" color="secondary" size="small" fullWidth>
            <Button>One</Button>
            <Button>Two</Button>
          </ButtonGroup>
          <Chip label="Ready" variant="outlined" color="success" size="small" clickable />
          <Rating defaultValue={2} size="large" color="warning" />
          <Link href="#" underline="always">
            Docs
          </Link>
          <SvgIcon titleAccess="Check">
            <path d="M20 6 9 17l-5-5" />
          </SvgIcon>
          <Autocomplete.Root>
            <Autocomplete.Input aria-label="Search" />
          </Autocomplete.Root>
          <List.Root dense disablePadding>
            <List.Item>
              <List.ItemButton selected>
                <List.ItemIcon>*</List.ItemIcon>
                <List.ItemText primary="List item" secondary="Secondary" />
              </List.ItemButton>
            </List.Item>
          </List.Root>
          <Table.Root size="small" stickyHeader>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Cell</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
          <Snackbar defaultOpen message="Saved" className="static" />
        </Stack>
      </Container>,
    );

    expect(screen.getByText('Navigation')).toBeTruthy();
    expect(screen.getByText('Ready')).toBeTruthy();
    expect(screen.getByText('List item')).toBeTruthy();
    expect(screen.getByText('Cell')).toBeTruthy();
  });
});
