import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, X } from "lucide-react";
import { PersonalInfo } from "../types";
import { useRef } from "react";

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  updatePersonalInfo: (updates: Partial<PersonalInfo>) => void;
}

export const PersonalInfoForm = ({ personalInfo, updatePersonalInfo }: PersonalInfoFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updatePersonalInfo({ profilePicture: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePicture = () => {
    updatePersonalInfo({ profilePicture: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Profile Picture Section */}
      <div className="space-y-2">
        <Label>Profile Picture</Label>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage 
              src={personalInfo.profilePicture} 
              alt={personalInfo.fullName || "Profile"} 
            />
            <AvatarFallback>
              {personalInfo.fullName 
                ? personalInfo.fullName.split(' ').map(n => n[0]).join('').toUpperCase()
                : 'P'
              }
            </AvatarFallback>
          </Avatar>
          
          <div className="flex flex-col gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={triggerFileUpload}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload Photo
            </Button>
            
            {personalInfo.profilePicture && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={removeProfilePicture}
                className="flex items-center gap-2 text-destructive hover:text-destructive"
              >
                <X className="h-4 w-4" />
                Remove
              </Button>
            )}
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        
        <p className="text-xs text-muted-foreground">
          Upload a professional headshot (JPG, PNG, GIF)
        </p>
      </div>
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          value={personalInfo.fullName}
          onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
          placeholder="John Doe"
        />
      </div>
      
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={personalInfo.email}
          onChange={(e) => updatePersonalInfo({ email: e.target.value })}
          placeholder="john@example.com"
        />
      </div>
      
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={personalInfo.phone}
          onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
          placeholder="+1 (555) 123-4567"
        />
      </div>
      
      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={personalInfo.address}
          onChange={(e) => updatePersonalInfo({ address: e.target.value })}
          placeholder="City, State, Country"
        />
      </div>
      
      <div>
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={personalInfo.summary}
          onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
          placeholder="A brief summary of your professional background and goals..."
          className="min-h-20"
        />
      </div>
    </div>
  );
};