import { useState } from 'react';
import { z } from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ImageIcon } from 'lucide-react';

// Enum for rating of fluency in a programming language
const FluencyEnum = z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']);

// Enum for course
const CourseEnum = z.enum([
  'B.Sc.(Hons.) Comp. Appls.',
  'MCA',
  'M.Sc. Cyber Security',
]);

// Course Schema
const courseSchema = CourseEnum;

// Programming Language Schema
const progLangSchema = z.object({
  name: z.string().nonempty(),
  fluency: FluencyEnum,
});

// Skills Schema
const skillsSchema = z.object({
  name: z.string(),
  fluency: FluencyEnum,
});

// Project Schema
const projectSchema = z.object({
  projectName: z
    .string()
    .min(2, { message: 'Project name must be at least 2 characters.' }),
  projectDescription: z.string().min(10, {
    message: 'Project description must be at least 10 characters.',
  }),
  technologiesUsed: z.string(),
  projectLink: z.string().url().optional(),
  projectDuration: z
    .string()
    .min(2, { message: 'Project duration must be at least 2 characters.' }),
});

// Achievement Schema
const achievementSchema = z.object({
  name: z.string().nonempty('This field is required'),
});

// User Profile's Form Schema
const FormSchema = z.object({
  profilePicture: z.instanceof(File).optional(),
  name: z.string().nonempty('This field is required'),
  title: z.string().nonempty('This field is required'),
  about: z
    .string()
    .max(200, 'Not more than 200 characters')
    .nonempty('This field is required'),
  dob: z.string().date('Invalid date').min(1, 'This field is required'),
  address: z.string().nonempty('This field is required'),
  enrollNo: z
    .string()
    .transform(val => val.toUpperCase())
    .refine(val => /^[A-Z]{2}[0-9]{4}$/.test(val), 'Invalid Enrollment number'),
  facultyNo: z
    .string()
    .transform(val => val.toUpperCase())
    .refine(
      val => /^[0-9]{2}[A-Z]{5}[0-9]{3}$/.test(val),
      'Invalid Faculty number'
    ),
  course: courseSchema,
  semester: z.string().nonempty('Semester is Required'),
  progLangs: z.array(progLangSchema),
  skills: z.array(skillsSchema),
  projects: z.array(projectSchema),
  achievements: z.array(achievementSchema),
  email: z.string().email().nonempty('This field is required'),
  phone: z.string().refine(val => /^(\+?\d{1,3}[- ]?)?\d{10}$/.test(val),'Invalid phone number'),
  github: z.string().url(),
  linkedin: z.string().url(),
});

type FormData = z.infer<typeof FormSchema>;

const StudentPortfolioForm = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      profilePicture: undefined,
      name: '',
      title: '',
      about: '',
      enrollNo: '',
      facultyNo: '',
      dob: '',
      address: '',
      course: undefined,
      semester: '',
      progLangs: [],
      skills: [],
      projects: [],
      achievements: [],
      email: '',
      phone: '',
      github: '',
      linkedin: '',
    },
  });

  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control: form.control,
    name: 'progLangs',
  });
  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control: form.control,
    name: 'projects',
  });
  const {
    fields: skillsFields,
    append: appendsSkill,
    remove: removeSkill,
  } = useFieldArray({
    control: form.control,
    name: 'skills',
  });

  const {
    fields: achievementsFields,
    append: appendAchievement,
    remove: removeAchievement,
  } = useFieldArray({
    control: form.control,
    name: 'achievements',
  });

  const onSubmit = (data: FormData) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto space-y-6 mt-8">
        <h1 className="text-3xl font-bold">Edit Profile</h1>
        <Card className="p-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-6 pb-12 mx-auto max-w-3xl"
            >
              <div className="grid grid-cols-[3fr_3fr_3fr] max-[700px]:grid-cols-1 space-x-4 max-[700px]:space-x-0 max-[700px]:space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="profilePicture"
                  control={form.control}
                  render={() => (
                    <FormItem className="text-left w-full">
                      <FormLabel>Upload Profile Picture</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-4">
                          <input
                            type="file"
                            accept="image/*"
                            id="image"
                            className="hidden"
                            onChange={e => {
                              const file = e.target.files?.[0];
                              if (file) {
                                form.setValue('profilePicture', file);
                                setPreview(URL.createObjectURL(file));
                              }
                            }}
                          />

                          <label
                            htmlFor="image"
                            className="cursor-pointer flex items-center px-4 py-2 border rounded-lg shadow-sm transition"
                          >
                            <ImageIcon className="mr-2" size={18} />
                            Choose File
                          </label>

                          {preview && (
                            <div className="relative">
                              <img
                                src={preview}
                                alt="Preview"
                                className="h-12 w-12 rounded-lg border object-cover"
                              />

                              <button
                                type="button"
                                onClick={() => {
                                  form.setValue('profilePicture', undefined);
                                  setPreview(null);
                                }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-[3fr_3fr_3fr] max-[700px]:grid-cols-1 space-x-4 max-[700px]:space-x-0 max-[700px]:space-y-4">
                <FormField
                  control={form.control}
                  name={`course`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select course" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="B.Sc.(Hons.) Comp. Appls.">
                              B.Sc.(Hons.) Comp. Appls.
                            </SelectItem>
                            <SelectItem value="MCA">MCA</SelectItem>
                            <SelectItem value="M.Sc. Cyber Security">
                              M.Sc. Cyber Security
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="semester"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Semester</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. I / II / III" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="enrollNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enrollment Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your enrollment number"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-[1fr_2fr] max-[700px]:grid-cols-1 space-x-4 max-[700px]:space-x-0 max-[700px]:space-y-4">
                <FormField
                  control={form.control}
                  name="facultyNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Faculty Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your faculty number"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about yourself"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <h3 className="text-lg font-medium">Programming Languages</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Programming Language</TableHead>
                      <TableHead>Fluency</TableHead>
                      <TableHead className=" w-[50px] text-center">
                        Delete
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {languageFields.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          <FormField
                            control={form.control}
                            name={`progLangs.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="Enter programming language"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`progLangs.${index}.fluency`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select fluency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Beginner">
                                        Beginner
                                      </SelectItem>
                                      <SelectItem value="Intermediate">
                                        Intermediate
                                      </SelectItem>
                                      <SelectItem value="Advanced">
                                        Advanced
                                      </SelectItem>
                                      <SelectItem value="Expert">
                                        Expert
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            type="button"
                            variant={'destructive'}
                            onClick={() => removeLanguage(index)}
                          >
                            <Trash2 color="white" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button
                  type="button"
                  variant={'secondary'}
                  className="mt-[32px]"
                  onClick={() =>
                    appendLanguage({ name: '', fluency: 'Beginner' })
                  }
                >
                  Add Programming Language
                </Button>
              </div>
              <div>
                <h3 className="text-lg font-medium">Other Skills</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Skills</TableHead>
                      <TableHead>Fluency</TableHead>
                      <TableHead className=" w-[50px] text-center">
                        Delete
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {skillsFields.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          <FormField
                            control={form.control}
                            name={`skills.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input placeholder="Enter skill" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`skills.${index}.fluency`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select fluency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Beginner">
                                        Beginner
                                      </SelectItem>
                                      <SelectItem value="Intermediate">
                                        Intermediate
                                      </SelectItem>
                                      <SelectItem value="Advanced">
                                        Advanced
                                      </SelectItem>
                                      <SelectItem value="Expert">
                                        Expert
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            type="button"
                            variant={'destructive'}
                            onClick={() => removeSkill(index)}
                          >
                            <Trash2 color="white" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button
                  type="button"
                  variant={'secondary'}
                  className="mt-[32px]"
                  onClick={() =>
                    appendsSkill({ name: '', fluency: 'Beginner' })
                  }
                >
                  Add Skills
                </Button>
              </div>
              <div>
                <h3 className="text-lg font-medium">Projects</h3>
                {projectFields.map((item, index) => (
                  <Card key={item.id} className="p-8 m-1 space-y-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-[2fr_1fr]">
                        <FormField
                          control={form.control}
                          name={`projects.${index}.projectName`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Project Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter project name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-end items-center">
                          <Button
                            type="button"
                            variant={'destructive'}
                            onClick={() => removeProject(index)}
                          >
                            <Trash2 color="white" />
                          </Button>
                        </div>
                      </div>
                      <FormField
                        control={form.control}
                        name={`projects.${index}.projectDescription`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter project description"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-[1fr_1fr_1fr] max-[700px]:grid-cols-1 space-x-4 max-[700px]:space-x-0 max-[700px]:space-y-4">
                      <FormField
                        control={form.control}
                        name={`projects.${index}.technologiesUsed`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Technologies Used</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter technologies used"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`projects.${index}.projectLink`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Link</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter project link"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`projects.${index}.projectDuration`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Duration</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter project duration"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                ))}
                <Button
                  type="button"
                  variant={'secondary'}
                  className="mt-[32px]"
                  onClick={() =>
                    appendProject({
                      projectName: '',
                      projectDescription: '',
                      technologiesUsed: '',
                      projectLink: '',
                      projectDuration: '',
                    })
                  }
                >
                  Add Projects
                </Button>
              </div>
              <div>
                <h3 className="text-lg font-medium">Achievements</h3>
                {achievementsFields.map((item, index) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[3fr_1fr] items-center space-y-2"
                  >
                    <FormField
                      control={form.control}
                      name={`achievements.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Enter achievement" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-center">
                      <Button
                        type="button"
                        variant={'destructive'}
                        onClick={() => removeAchievement(index)}
                      >
                        <Trash2 color="white" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant={'secondary'}
                  className="mt-[32px]"
                  onClick={() => appendAchievement({ name: '' })}
                >
                  Add Achievement
                </Button>
              </div>
              <div className="grid grid-cols-[2fr_2fr_2fr_2fr] max-[700px]:grid-cols-1 space-x-4 max-[700px]:space-x-0 max-[700px]:space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          className=" w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="github"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub Profile</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter GitHub Profile" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn Profile</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter LinkedIn Profile"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter Phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default StudentPortfolioForm;
