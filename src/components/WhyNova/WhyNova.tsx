import Grid from "@mui/material/Grid"

export default function WhyNova() {
    return (
        <Grid container spacing={2}>
            <Grid size={{
                xs: 12,
                md: 6
            }}>
                Left
            </Grid>
            
            <Grid size={{
                xs: 12,
                md: 6
            }}>
                Right
            </Grid>
        </Grid>
    )
};