import { Card, Typography } from "@mui/material";
import {Stack} from '@mui/system';
// import {download, generateCsv, mkConfig} from 'export-to-csv';
import {MaterialReactTable, useMaterialReactTable} from 'material-react-table';
import { useEffect, useState } from "react";

// const csvConfig = mkConfig({
//     fieldSeparator: ',',
//     decimalSeparator: ',',
//     useKeysAsHeaders: true,
// });

const WMTable = (props) => {
    const [rowSelection, setRowSelection] = useState({});

    useEffect(()=>{
        if(rowSelection){
            const selectedIds = Object.keys(rowSelection).map(
                (item) => props?.data[item]?.[props?.selectedIdsFields]
            );
            props?.handleChangeRowSelect && props?.handleChangeRowSelect(selectedIds);
        }
    },[rowSelection]);

    useEffect(()=>{
        if(Object.keys(rowSelection)?.length && !props?.selectedIds?.length) {
            setRowSelection({})
        }
    },[props?.selectedIds])

    const table = useMaterialReactTable({
        columns: props.columns,
        data:props.data,
        initialState: {density: 'compact'},
        enableRowSelection: props?.enableRowSelection,
        enableRowActions: props?.tableActions,
        renderRowActions:() => props?.tableActions,
        onRowSelectionChange: setRowSelection,
        state: {rowSelection},
        positionActionColumn: 'last',
        muiTablePaperProps: {
            elevation: 0,
            sx: {
                borderRadius: '0',
                border: 'none',
            },
        },
    });

    return(
        <>
            <Card>
                {(props.headerAction || props.tableTitle) && (
                    <Stack
                        direction={'column'}
                        p={1}
                        sx={{
                            borderBottom: `1px solid #eeeee`,
                        }}
                    >
                        <Stack
                            direction={'row'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                            flexWrap={'wrap'}
                            gap={3}
                        >
                            <Typography variant="h2">{props.tableTitle}</Typography>
                            {props.headerAction && (
                                <Stack
                                    direction={'row'}
                                    spacing={1}
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                >
                                    {props.headerAction}
                                </Stack>
                            )}
                        </Stack>
                        {props.customAccordion}
                    </Stack>
                )}
                <MaterialReactTable table={table} />
            </Card>
        </>
    )

}

export default WMTable;