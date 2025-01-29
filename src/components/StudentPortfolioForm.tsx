import React from 'react';
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

// Enum for rating of fluency in a programming language
const FluencyEnum = z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']);

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
  projectDescription: z
    .string()
    .min(10, {
      message: 'Project description must be at least 10 characters.',
    }),
  technologiesUsed: z.array(z.string()),
  projectLink: z.string().url().optional(),
  projectDuration: z
    .string()
    .min(2, { message: 'Project duration must be at least 2 characters.' }),
});

// Profile Picture Schema
const maxSize = 2 * 1024 * 1024; // 2MB
const fileFormat = ['image/jpeg', 'image/png']; // Only JPEG and PNG are allowed

const profilePictureSchema = z.object({
  profilePicture: z
    .custom<FileList>(value => value instanceof FileList, {
      message: 'Please upload a file.',
    })
    .refine(files => files.length > 0, {
      message: 'Profile picture is required.',
    })
    .refine(files => files[0]?.size <= maxSize, {
      message: 'File size must be less than 2MB.',
    })
    .refine(files => fileFormat.includes(files[0]?.type), {
      message: 'Invalid file type. Only JPEG and PNG are allowed.',
    }),
});

// User Profile's Form Schema
const FormSchema = z.object({
  profilePicture: profilePictureSchema,
  name: z.string().nonempty('This field is required'),
  title: z.string().nonempty('This field is required'),
  about: z
    .string()
    .max(200, 'Not more than 200 characters')
    .nonempty('This field is required'),
  dob: z.string().date('Invalid date').nonempty('This field is required'),
  address: z.string().nonempty('This field is required'),
  enrollNo: z
    .string()
    .regex(/^[A-Z]{2}[0-9]{4}$/, 'Invalid Enrollment number')
    .nonempty('This field is required'),
  facultyNo: z
    .string()
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{3}$/, 'Invalid Faculty number')
    .nonempty('This field is required'),
  course: z
    .enum([
      'SELECT',
      'B.Sc.(Hons.) Comp. Appls.',
      'MCA',
      'M.Sc. Cyber Security',
    ])
    .refine(val => val !== 'SELECT', {
      message: 'You must select a valid course',
    }),
  semester: z
    .string()
    .regex(
      /^(?:(B\.Sc\.\(Hons\.\) Comp\. Appls\.: (I|II|III|IV|V|VI|VII|VIII))|(MCA|M\.Sc\. Cyber Security: (I|II|III|IV)))$/,
      'Invalid semester for the selected course'
    )
    .nonempty('Semester is Required'),
  progLangs: z.array(progLangSchema),
  skills: z.array(skillsSchema),
  projects: z.array(projectSchema),
  achievements: z.array(
    z
      .string()
      .max(50, 'Not more than 50 characters')
      .nonempty('This field is required')
  ),
  email: z.string().email().nonempty('This field is required'),
  phone: z
    .string()
    .regex(/^\d{10}$/)
    .nonempty('This field is required'),
  github: z.string().url(),
  linkedin: z.string().url(),
});

type FormData = z.infer<typeof FormSchema>;

const StudentPortfolioForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      profilePicture: undefined,
      name: '',
      title: '',
      about: '',
      enrollNo: '',
      facultyNo: '',
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
    name: 'project',
  });
  const {
    fields: skillsFields,
    append: appendsSkill,
    remove: removeSkill,
  } = useFieldArray({
    control: form.control,
    name: 'progLangs',
  });
  const {
    fields: techFields,
    append: appendTech,
    remove: removeTech,
  } = useFieldArray({
    control: form.control,
    name: 'progLangs',
  });
  const {
    fields: achievementsFields,
    append: appendAchievement,
    remove: removeAchievement,
  } = useFieldArray({
    control: form.control,
    name: 'progLangs',
  });

  const onSubmit = (data: FormData) => {
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
              <div className="grid grid-cols-[3fr_3fr_3fr] space-x-4">
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
                        <Input
                          type="date"
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
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
								<Input placeholder="Enter your enrollment number" {...field}/>
							</FormControl>
						</FormItem>
					)}
				/>
              </div>
              <div className="grid grid-cols-[3fr_3fr_3fr] space-x-4">
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Course" />
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
					name="facultyNo"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Faculty Number</FormLabel>
							<FormControl>
								<Input placeholder="Enter your faculty number" {...field}/>
							</FormControl>
						</FormItem>
					)}
				/>
              </div>
			  <div className='grid grid-cols-[2fr_1fr] space-x-4'>
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
				<FormField
                  control={form.control}
                  name="profilePicture"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Profile Picture</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          onChange={e => field.onChange(e.target.files)}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          className="cursor-pointer"
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
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
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
                                  <Input
                                    placeholder="Enter library"
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
                            name={`skills.${index}.fluency`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
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
                  Add Library
                </Button>
              </div>
              <div>
                <h3 className="text-lg font-medium">Projects</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Project Description</TableHead>
                      <TableHead>Technologies Used</TableHead>
                      <TableHead>Project Link</TableHead>
                      <TableHead>Project Duration</TableHead>
                      <TableHead className=" w-[50px] text-center">
                        Delete
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projectFields.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
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
                        </TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`projects.${index}.technologiesUsed`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Technology</FormLabel>
                                <FormControl>
                                  <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            type="button"
                            variant={'destructive'}
                            onClick={() => removeProject(index)}
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
                    appendProject({
                      projectName: '',
                      projectDescription: '',
                      technologiesUsed: [],
                      projectLink: '',
                      projectDuration: '',
                    })
                  }
                >
                  Add Project
                </Button>
              </div>
			  <div>
				{/* Achievements */}
			  </div>
              <div className="grid grid-cols-[2fr_2fr_2fr_2fr] space-x-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
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
                        <Input
                          placeholder="Enter GitHub Profile"
                          {...field}
                        />
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
                        <Input placeholder="Enter Phone number" {...field} />
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
