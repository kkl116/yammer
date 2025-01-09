import {
    Grid2,
    Card,
    CardContent,
    Stack,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from "@mui/material";
import ProductTable from "../features/productTable/productTable";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PercentIcon from '@mui/icons-material/Percent';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


export default function ProductDetailsPage() {
    return (
        <Grid2 container spacing={5}>
            <Grid2 size={12}>
                <Card variant={"outlined"}>
                    <CardContent>
                        Description:
                    </CardContent>
                </Card>
            </Grid2>
            <Grid2 size={12}>
                <Card variant={"outlined"}>
                    <Stack
                        direction={"row"} spacing={12}
                        sx={{
                           justifyContent: "space-between",
                           alignItems: "center",
                        }}
                    >
                        <CardContent>Height: (height)</CardContent>
                        <CardContent>Width: (width)</CardContent>
                        <CardContent>Depth: (depth)</CardContent>
                    </Stack>
                </Card>
            </Grid2>
            <Grid2 size={8}>
                <ProductTable />
            </Grid2>
            <Grid2 size={4}>
                <Card variant={"outlined"}>
                    <Stack
                        direction={"column"}
                        spacing={2}
                        sx={{
                            alignItems: "stretch"
                        }}
                        divider={<Divider orientation="horizontal" />}
                    >
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <AddIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    Price: (price)
                                </ListItemText>
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <RemoveIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    Total Cost: (total cost)
                                </ListItemText>
                            </ListItem>
                        </List>

                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <AttachMoneyIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    Profit: (profit)
                                </ListItemText>
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <PercentIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    Margin: (margin)
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Stack>
                </Card>
            </Grid2>
        </Grid2>
    )
}
