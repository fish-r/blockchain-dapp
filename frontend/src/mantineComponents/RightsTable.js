import cx from 'clsx';
import React, { useState } from 'react';
import { Table, ScrollArea } from '@mantine/core';
import tableClasses from './Table.module.css';
import { StatusButton } from './StatusButton';

const rightsData = [
    {
        albumName: 'Athena Weissnat',
        artistName: 'Little - Rippin',
        image: '',
        copyrightId: 'Elouise.Prohaska@yahoo.com',
        price: '',
        status: '',
    },
];

export function RightsTable() {
    const [scrolled, setScrolled] = useState(false);

    const rows = rightsData.map((row, index) => (
        <tr key={index}> {/* Changed key to index for uniqueness */}
            <td>{row.albumName}</td>
            <td>{row.artistName}</td>
            <td>{row.image}</td>
            <td>{row.copyrightId}</td>
            <td>{row.price}</td>
            <td><StatusButton /></td>
        </tr>
    ));

    return (
        <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table miw={700}>
                <Table.Thead className={cx(tableClasses.header, { [tableClasses.scrolled]: scrolled })}>
                    <Table.Tr>
                        <Table.Th>Album Name</Table.Th>
                        <Table.Th>Artist Name</Table.Th>
                        <Table.Th>Album Image</Table.Th>
                        <Table.Th>Copyrights ID</Table.Th>
                        <Table.Th>Listing Price</Table.Th>
                        <Table.Th>Status</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </ScrollArea>
    );
}
