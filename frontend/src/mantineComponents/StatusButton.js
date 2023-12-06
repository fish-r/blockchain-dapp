import { useState } from 'react';
import { useInterval } from '@mantine/hooks';
import { Button, Progress, useMantineTheme, rgba } from '@mantine/core';
import buttonClasses from './StatusButton.module.css';

export function StatusButton() {
    const theme = useMantineTheme();
    const [progress, setProgress] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const interval = useInterval(
        () =>
            setProgress((current) => {
                if (current < 100) {
                    return current + 1;
                }

                interval.stop();
                setLoaded(true);
                return 0;
            }),
        20
    );

    return (
        <Button
            fullWidth
            className={buttonClasses.button}
            onClick={() => (loaded ? setLoaded(false) : !interval.active && interval.start())}
            color={loaded ? 'teal' : theme.primaryColor}
        >
            <div className={buttonClasses.label}>
                {progress !== 0 ? 'Updating' : loaded ? 'Stop Listing' : 'Sell on Market'}
            </div>
            {progress !== 0 && (
                <Progress
                    value={progress}
                    className={buttonClasses.progress}
                    color={rgba(theme.colors.blue[2], 0.35)}
                    radius="sm"
                />
            )}
        </Button>
    );
}