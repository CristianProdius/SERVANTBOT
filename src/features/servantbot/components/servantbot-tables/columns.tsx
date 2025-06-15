'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { ServantBot } from '@/constants/data';
import { Column, ColumnDef } from '@tanstack/react-table';
import {
  IconRobot,
  IconBattery,
  IconBattery1,
  IconBattery2,
  IconBattery3,
  IconBattery4,
  IconWifi,
  IconWifiOff,
  IconMapPin
} from '@tabler/icons-react';
import { CellAction } from './cell-action';
import { STATUS_OPTIONS, FACILITY_OPTIONS } from './options';
import { TextCursorIcon } from 'lucide-react';

// Helper function for battery icon
const getBatteryIcon = (level: number) => {
  if (level > 75) return <IconBattery4 className='size-4 text-green-500' />;
  if (level > 50) return <IconBattery3 className='size-4 text-yellow-500' />;
  if (level > 25) return <IconBattery2 className='size-4 text-orange-500' />;
  if (level > 10) return <IconBattery1 className='size-4 text-red-500' />;
  return <IconBattery className='size-4 animate-pulse text-red-500' />;
};

export const columns: ColumnDef<ServantBot>[] = [
  {
    accessorKey: 'unitId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Unit ID' />
    ),
    cell: ({ row }) => (
      <div className='flex items-center gap-2 font-medium'>
        <IconRobot className='size-4' />
        {row.getValue('unitId')}
      </div>
    ),
    enableSorting: true,
    enableHiding: false
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }: { column: Column<ServantBot, unknown> }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ cell }) => (
      <div className='font-medium'>{cell.getValue<ServantBot['name']>()}</div>
    ),
    meta: {
      label: 'Name',
      placeholder: 'Search bots...',
      variant: 'text',
      icon: TextCursorIcon
    },
    enableColumnFilter: true
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }: { column: Column<ServantBot, unknown> }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ cell }) => {
      const status = cell.getValue<ServantBot['status']>();
      const statusConfig = {
        active: { variant: 'default', label: 'Active' },
        idle: { variant: 'secondary', label: 'Idle' },
        charging: { variant: 'outline', label: 'Charging' },
        maintenance: { variant: 'secondary', label: 'Maintenance' },
        offline: { variant: 'destructive', label: 'Offline' }
      };

      const config = statusConfig[status] || statusConfig.offline;

      return <Badge variant={config.variant as any}>{config.label}</Badge>;
    },
    enableColumnFilter: true,
    meta: {
      label: 'Status',
      variant: 'multiSelect',
      options: STATUS_OPTIONS
    }
  },
  {
    accessorKey: 'batteryLevel',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Battery' />
    ),
    cell: ({ row }) => {
      const level = row.getValue('batteryLevel') as number;
      return (
        <div className='flex items-center gap-2'>
          {getBatteryIcon(level)}
          <span className='text-sm font-medium'>{level}%</span>
        </div>
      );
    },
    enableSorting: true
  },
  {
    id: 'facility',
    accessorKey: 'facility',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Facility' />
    ),
    cell: ({ row }) => (
      <div>
        <div className='text-sm'>{row.getValue('facility')}</div>
        <div className='text-muted-foreground flex items-center gap-1 text-xs'>
          <IconMapPin className='size-3' />
          {row.original.location}
        </div>
      </div>
    ),
    enableColumnFilter: true,
    meta: {
      label: 'Facility',
      variant: 'multiSelect',
      options: FACILITY_OPTIONS
    }
  },
  {
    accessorKey: 'connectivity',
    header: 'Connection',
    cell: ({ row }) => {
      const connected = row.getValue('connectivity') === 'connected';
      return (
        <Badge
          variant={connected ? 'outline' : 'destructive'}
          className='gap-1'
        >
          {connected ? (
            <IconWifi className='size-3' />
          ) : (
            <IconWifiOff className='size-3' />
          )}
          {connected ? 'Online' : 'Offline'}
        </Badge>
      );
    }
  },
  {
    accessorKey: 'tasksCompleted',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tasks Today' />
    ),
    cell: ({ row }) => (
      <div className='text-center'>
        <div className='text-sm font-medium'>
          {row.getValue('tasksCompleted')}
        </div>
        <div className='text-muted-foreground text-xs'>completed</div>
      </div>
    ),
    enableSorting: true
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
