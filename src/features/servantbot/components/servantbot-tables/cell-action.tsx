'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ServantBot } from '@/constants/data';
import {
  IconEdit,
  IconDotsVertical,
  IconTrash,
  IconEye,
  IconTool,
  IconRotateClockwise,
  IconHandStop
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CellActionProps {
  data: ServantBot;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    // Handle bot decommission
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
        title='Decommission ServantBot?'
        description='This will permanently remove this ServantBot from your fleet. This action cannot be undone.'
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <IconDotsVertical className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/servantbot/${data.id}`)}
          >
            <IconEye className='mr-2 h-4 w-4' /> View Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/servantbot/${data.id}/edit`)}
          >
            <IconEdit className='mr-2 h-4 w-4' /> Configure
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <IconTool className='mr-2 h-4 w-4' /> Schedule Maintenance
          </DropdownMenuItem>
          <DropdownMenuItem disabled={data.status !== 'active'}>
            <IconRotateClockwise className='mr-2 h-4 w-4' /> Recall to Base
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className='text-red-600'>
            <IconHandStop className='mr-2 h-4 w-4' /> Emergency Stop
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className='text-red-600'
          >
            <IconTrash className='mr-2 h-4 w-4' /> Decommission
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
