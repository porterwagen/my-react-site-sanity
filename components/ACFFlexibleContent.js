import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * ACF Flexible Content Renderer Component
 * 
 * Renders ACF flexible content blocks for text, CTA, and image fields
 * Compatible with ACF to REST API plugin
 */
const ACFFlexibleContent = ({ blocks }) => {
  // Debug: log blocks structure for troubleshooting
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && blocks && Array.isArray(blocks)) {
      console.log('ACFFlexibleContent: Processing blocks:', 
        blocks.map(block => {
          // For text blocks, check the text_block field
          const textBlockInfo = block.acf_fc_layout === 'text' ? {
            hasTextBlock: !!block.text_block,
            textBlockPreview: block.text_block ? 
              `${block.text_block.substring(0, 30)}...` : 
              'Missing text_block content'
          } : {};
          
          return {
            type: block.acf_fc_layout,
            ...textBlockInfo
          };
        })
      );
    }
  }, [blocks]);
  
  // Return null if no blocks provided
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    console.warn('ACFFlexibleContent: No valid blocks provided');
    return null;
  }

  return (
    <div className="acf-flexible-content">
      {blocks.map((block, index) => {
        // Skip invalid blocks
        if (!block || typeof block !== 'object') {
          console.warn(`ACFFlexibleContent: Invalid block at index ${index}`);
          return null;
        }
        
        // Check the block type (acf_fc_layout field is used by ACF to identify layout type)
        const blockType = block.acf_fc_layout;
        
        if (!blockType) {
          console.warn(`ACFFlexibleContent: Block at index ${index} has no acf_fc_layout property`);
          return null;
        }

        switch (blockType) {
          case 'text':
            return (
              <div key={`text-${index}`} className="text-block mb-8">
                {/* Handle the text_block field which contains WYSIWYG content */}
                {block.text_block && (
                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: block.text_block }} 
                  />
                )}
              </div>
            );

          case 'cta':
            // Use dummy data for CTA since the real data will be handled elsewhere
            return (
              <div key={`cta-${index}`} className="cta-block mb-8 bg-blue-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                <div className="mb-4">
                  Ready to start your next project with us? Have questions about our services?
                  We&apos;re here to help you bring your ideas to life.
                </div>
                <Link 
                  href="/contact"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            );

          case 'image':
            return (
              <div key={`image-${index}`} className="image-block mb-8">
                
                {block.image && (
                  <div className="relative overflow-hidden rounded-lg shadow-md">
                    {block.image.url ? (
                      <Image
                        src={block.image.url}
                        alt={block.image.alt || block.title || "Featured image"}
                        width={block.image.width || 800}
                        height={block.image.height || 500}
                        className="w-full h-auto"
                        priority={index === 0}
                      />
                    ) : typeof block.image === 'string' ? (
                      <Image
                        src={block.image}
                        alt={block.title || "Featured image"}
                        width={800}
                        height={500}
                        className="w-full h-auto"
                        priority={index === 0}
                      />
                    ) : null}
                  </div>
                )}
              
              </div>
            );

          default:
            // If block type is not recognized, log a warning and return null
            console.warn(`Unknown ACF block type: ${blockType}`);
            return null;
        }
      })}
    </div>
  );
};

export default ACFFlexibleContent;
