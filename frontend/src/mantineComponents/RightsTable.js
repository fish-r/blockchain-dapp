import cx from 'clsx';
import React, { useState } from 'react';
import { Table, ScrollArea } from '@mantine/core';
import tableClasses from './Table.module.css';
import { StatusButton } from './StatusButton';

const rightsData = [
    {
        musicName: 'Athena Weissnat',
        artistName: 'Little - Rippin',
        copyrightId: 'Elouise.Prohaska@yahoo.com',
        status: '',
    },
];

export function RightsTable() {
    const [scrolled, setScrolled] = useState(false);

    const rows = rightsData.map((row, index) => (
        <tr key={index}> {/* Changed key to index for uniqueness */}
            <td>{row.musicName}</td>
            <td>{row.artistName}</td>
            <td>{row.copyrightId}</td>
            <td><StatusButton /></td>
        </tr>
    ));

    return (
        <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table miw={700}>
                <Table.Thead className={cx(tableClasses.header, { [tableClasses.scrolled]: scrolled })}>
                    <Table.Tr>
                        <Table.Th>Music Name</Table.Th>
                        <Table.Th>Artist Name</Table.Th>
                        <Table.Th>Copyrights ID</Table.Th>
                        <Table.Th>Status</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </ScrollArea>
    );
}
