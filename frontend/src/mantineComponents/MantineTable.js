import { Table } from '@mantine/core';

function MantineTable(elements) {
    const rows = elements.map((elements) => (
        <Table.Tr key={elements.name}>
            <Table.Td>{elements.position}</Table.Td>
            <Table.Td>{elements.name}</Table.Td>
            <Table.Td>{elements.symbol}</Table.Td>
            <Table.Td>{elements.mass}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Element position</Table.Th>
                    <Table.Th>Element name</Table.Th>
                    <Table.Th>Symbol</Table.Th>
                    <Table.Th>Atomic mass</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    );
}

export default MantineTable;