import React from 'react'

function Story() {
  return (
    <div>
      
    <div class="stories-wrapper">
    <div class="story">
        <div class="story-bar">
            <div class="progress-bar"></div>
        </div>
        <img src="story1.jpg" alt="Story 1" class="story-image"/>
        <div class="story-controls">
            <button class="prev-button">&#10094;</button>
            <button class="next-button">&#10095;</button>
        </div>
    </div>
    <div class="story">
        <div class="story-bar">
            <div class="progress-bar"></div>
        </div>
        <img src="story2.jpg" alt="Story 2" class="story-image"/>
        <div class="story-controls">
            <button class="prev-button">&#10094;</button>
            <button class="next-button">&#10095;</button>
        </div>
    </div>
    <div class="story">
        <div class="story-bar">
            <div class="progress-bar"></div>
        </div>
        <img src="story3.jpg" alt="Story 3" class="story-image"/>
        <div class="story-controls">
            <button class="prev-button">&#10094;</button>
            <button class="next-button">&#10095;</button>
        </div>
    </div>
</div>
    </div>
  )
}

export default Story