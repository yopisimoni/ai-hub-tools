"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getToolById } from '@/lib/tool-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CommentSection } from '@/components/comment-section';

// Main Tool Detail Page Component
const ToolDetailPage = ({ params }: { params: { category: string, toolSlug: string } }) => {

  const { category: categorySlug, toolSlug } = params;
  const [tool, setTool] = useState(getToolById(toolSlug));

  // Assuming category name lookup is implemented elsewhere or not needed for the back link text
  const displayCategoryName = categorySlug; // Replace with actual lookup if needed

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        {categorySlug && (
          <Link href={`/categories/${categorySlug}`} className="text-blue-600 hover:underline">
            &larr; Back to {displayCategoryName}
        )}
      </div>
      <h1 className="text-3xl font-bold mb-4">{tool?.name}</h1>
      <p className="text-lg text-gray-700 mb-4">{tool?.description}</p>
      {tool?.link && (
        <Button asChild>
          <a href={tool.link} target="_blank" rel="noopener noreferrer">
            Visit Website
          </a>
        </Button>
      )}

      {/* Include the CommentSection component */}
      {tool && <CommentSection toolId={tool.id} />}
    </div>
  );
};

export default ToolDetailPage;