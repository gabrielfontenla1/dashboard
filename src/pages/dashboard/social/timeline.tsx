import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { About } from '@/components/dashboard/social/about';
import { PostAdd } from '@/components/dashboard/social/post-add';

export function Page(): React.JSX.Element {
  return (
    <div>
      <Grid container spacing={4}>
        <Grid lg={4} xs={12}>
          <Stack spacing={4}>
            <Card>
              <CardHeader title="Profile progress" />
              <CardContent>
                <Stack spacing={2}>
                  <LinearProgress value={50} variant="determinate" />
                  <Typography color="text.secondary" variant="subtitle2">
                    50% set up complete
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
            <About />
          </Stack>
        </Grid>
        <Grid lg={8} xs={12}>
          <Stack spacing={4}>
            <PostAdd />
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}
