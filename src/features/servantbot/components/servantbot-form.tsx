'use client';

import { FileUploader } from '@/components/file-uploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { ServantBot } from '@/constants/mock-api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  IconRobot,
  IconHome,
  IconMedicalCross,
  IconMapPin,
  IconWifi
} from '@tabler/icons-react';
import * as z from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

const formSchema = z.object({
  image: z
    .any()
    .optional()
    .refine((files) => !files || files?.length <= 1, 'Only one image allowed.')
    .refine(
      (files) => !files || files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => !files || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
  unitId: z.string().min(2, {
    message: 'Unit ID must be at least 2 characters.'
  }),
  name: z.string().min(2, {
    message: 'Bot name must be at least 2 characters.'
  }),
  facility: z.string().min(1, {
    message: 'Please select a facility.'
  }),
  primaryMode: z.enum(['healthcare', 'home-assistance', 'hybrid']),
  capabilities: z.array(z.string()).min(1, {
    message: 'Select at least one capability.'
  }),
  wifiSSID: z.string().min(1, {
    message: 'WiFi network is required.'
  }),
  wifiPassword: z.string().min(8, {
    message: 'WiFi password must be at least 8 characters.'
  }),
  emergencyContact: z.string().email({
    message: 'Please enter a valid email address.'
  }),
  notes: z.string().optional(),
  autoStart: z.boolean().default(false),
  enableAlerts: z.boolean().default(true)
});

const availableCapabilities = [
  { id: 'medication-delivery', label: 'Medication Delivery' },
  { id: 'vitals-monitoring', label: 'Vitals Monitoring' },
  { id: 'fall-detection', label: 'Fall Detection' },
  { id: 'mobility-assistance', label: 'Mobility Assistance' },
  { id: 'meal-delivery', label: 'Meal Delivery' },
  { id: 'companionship', label: 'Companionship' },
  { id: 'emergency-response', label: 'Emergency Response' },
  { id: 'cleaning', label: 'Light Cleaning' }
];

export default function ServantBotForm({
  initialData,
  pageTitle
}: {
  initialData: ServantBot | null;
  pageTitle: string;
}) {
  const defaultValues = {
    unitId: initialData?.unitId || `SB-MD-${String(Date.now()).slice(-6)}`,
    name: initialData?.name || '',
    facility: initialData?.facility || '',
    primaryMode: initialData?.primaryMode || 'healthcare',
    capabilities: initialData?.capabilities || [],
    wifiSSID: initialData?.network?.ssid || '',
    wifiPassword: '',
    emergencyContact: initialData?.emergencyContact || '',
    notes: initialData?.notes || '',
    autoStart: initialData?.autoStart || false,
    enableAlerts: initialData?.enableAlerts ?? true
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Deploying ServantBot:', values);
    // API call to deploy/update ServantBot would go here
  }

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-left text-2xl font-bold'>
          <IconRobot className='size-6' />
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            {/* Bot Image Upload */}
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <div className='space-y-6'>
                  <FormItem className='w-full'>
                    <FormLabel>Bot Profile Image (Optional)</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        maxFiles={1}
                        maxSize={5 * 1024 * 1024}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            {/* Basic Information */}
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='unitId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='SB-MD-001'
                        {...field}
                        disabled={initialData !== null}
                      />
                    </FormControl>
                    <FormDescription>
                      Unique identifier for this ServantBot
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bot Name</FormLabel>
                    <FormControl>
                      <Input placeholder='MediBot Alpha' {...field} />
                    </FormControl>
                    <FormDescription>
                      Friendly name for staff identification
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Deployment Configuration */}
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='facility'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facility</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select facility' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='Chisinau Assisted Living'>
                          Chisinau Assisted Living
                        </SelectItem>
                        <SelectItem value='Balti Care Center'>
                          Balti Care Center
                        </SelectItem>
                        <SelectItem value='Comrat Senior Home'>
                          Comrat Senior Home
                        </SelectItem>
                        <SelectItem value='Cahul Medical Center'>
                          Cahul Medical Center
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='primaryMode'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Mode</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select mode' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='healthcare'>
                          <span className='flex items-center gap-2'>
                            <IconMedicalCross className='size-4' />
                            Healthcare Mode
                          </span>
                        </SelectItem>
                        <SelectItem value='home-assistance'>
                          <span className='flex items-center gap-2'>
                            <IconHome className='size-4' />
                            Home Assistance
                          </span>
                        </SelectItem>
                        <SelectItem value='hybrid'>
                          <span className='flex items-center gap-2'>
                            <IconRobot className='size-4' />
                            Hybrid Mode
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Capabilities Selection */}
            <FormField
              control={form.control}
              name='capabilities'
              render={() => (
                <FormItem>
                  <div className='mb-4'>
                    <FormLabel className='text-base'>
                      Enabled Capabilities
                    </FormLabel>
                    <FormDescription>
                      Select the features this ServantBot will support
                    </FormDescription>
                  </div>
                  <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
                    {availableCapabilities.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name='capabilities'
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className='flex flex-row items-start space-y-0 space-x-3'
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className='cursor-pointer text-sm font-normal'>
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Network Configuration */}
            <div className='space-y-4'>
              <h3 className='flex items-center gap-2 text-lg font-medium'>
                <IconWifi className='size-5' />
                Network Configuration
              </h3>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='wifiSSID'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WiFi Network (SSID)</FormLabel>
                      <FormControl>
                        <Input placeholder='Facility-WiFi-5G' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='wifiPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WiFi Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Enter WiFi password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Safety Settings */}
            <FormField
              control={form.control}
              name='emergencyContact'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Contact Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='emergency@facility.md'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Receives critical alerts and emergency notifications
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bot Settings */}
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='autoStart'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                    <div className='space-y-0.5'>
                      <FormLabel className='text-base'>
                        Auto-Start on Boot
                      </FormLabel>
                      <FormDescription>
                        Automatically begin operations after power on
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='enableAlerts'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                    <div className='space-y-0.5'>
                      <FormLabel className='text-base'>Enable Alerts</FormLabel>
                      <FormDescription>
                        Send notifications for important events
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Additional Notes */}
            <FormField
              control={form.control}
              name='notes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deployment Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Special instructions or notes about this deployment...'
                      className='resize-none'
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='flex items-center gap-2'>
              <IconRobot className='size-4' />
              {initialData ? 'Update ServantBot' : 'Deploy ServantBot'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
