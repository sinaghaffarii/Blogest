import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select';
import { Separator } from '../ui/Separator';
import { Switch } from '../ui/Switch';
import { Badge } from '../ui/Badge';
import { toEnglishDate, toPersianDate } from '@/utils/toPersianDate';
import { Button } from '../ui/Button';

const Blogs = () => {
  return (
    <div className="w-full col-span-7 mb-auto space-y-4">
      <div className="flex items-center justify-start flex-col">
        <article className="flex items-center justify-start w-full me-auto mb-3">
          <SearchIcon className="size-5 me-3" />
          <p className="text-sm md:text-base lg:text-lg">Search</p>
        </article>
        <Input className="h-10 mt-4 bg-white" placeholder="Search Keyword..." />
      </div>
      <div className="flex items-center justify-between w-full mt-8">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem className="capitalize" value="all">
                all
              </SelectItem>
              <SelectItem className="capitalize" value="javascript">
                javascript
              </SelectItem>
              <SelectItem className="capitalize" value="react">
                react
              </SelectItem>
              <SelectItem className="capitalize" value="frontend">
                frontend
              </SelectItem>
              <SelectItem className="capitalize" value="backend">
                backend
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2">
          <Label htmlFor="airplane-mode">Asc</Label>
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Desc</Label>
        </div>
      </div>
      <Separator />
      <div>
        <Card>
          <CardHeader className="relative">
            <Image
              height={250}
              width={400}
              alt="Card_Header"
              className="rounded-xl w-full object-contain max-h-[400px]"
              src="/images/mr-robot.jpg"
            />
            <Button
              size="sm"
              className="absolute top-4 start-10 rounded-full text-xs md:text-sm bg-secondary"
              variant="secondary"
            >
              Next.js
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-base md:text-lg font-medium">
                Dynamically create sitemap.xml in Next.js
              </p>
              <p className="text-xs md:text-sm text-gray-500">
                {toEnglishDate(new Date())}
              </p>
              <p className="text-sm md:text-base font-light text-gray-500">
                Let's load the sitemap dynamically
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-start w-full flex-wrap gap-3">
            <Badge variant="outline">Next.js</Badge>
            <Badge variant="outline">Javascript</Badge>
            <Badge variant="outline">React</Badge>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Blogs;
