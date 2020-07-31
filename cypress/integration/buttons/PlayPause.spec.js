describe('PlayPause', () => {
	it('works', () => {
		cy.visit('/');

		// Playback is stopped.
		cy.get('#play-pause').should('contain', 'Play');
		cy.get('#now-playing-title').should('not.exist');
		cy.get('#now-playing-artist').should('not.exist');
		cy.get('#row-2197-icon').should('not.exist');

		cy.get('#play-pause').click();

		// Starts playback.
		cy.get('#play-pause').should('contain', 'Pause');
		cy.get('#now-playing-title').should('exist');
		cy.get('#now-playing-artist').should('exist');
		cy.get('#row-2197-icon').should('contain', 'Playing');

		cy.get('#play-pause').click();

		// Pauses playback.
		cy.get('#play-pause').should('contain', 'Play');
		cy.get('#now-playing-title').should('exist');
		cy.get('#now-playing-artist').should('exist');
		cy.get('#row-2197-icon').should('contain', 'Paused');
	});
});
