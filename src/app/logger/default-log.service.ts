// Define the interface that all loggers must implement

export interface ILogger {
	assert( ...args: any[] ) : void;
	error( ...args: any[] ) : void;
	group( ...args: any[] ) : void;
	groupEnd( ...args: any[] ) : void;
	info( ...args: any[] ) : void;
	log( ...args: any[] ) : void;
	warn( ...args: any[] ) : void;
} 


// Set up the default logger.  It does not log anything.  But, it provides
// the Dependency-Injection (DI) token that the rest of the application
// can use for dependency resolution.
// 
// Each platform can then override this, with a platform-specific logger
// implementation, like the ConsoleLogService.

export class Logger implements ILogger {

	public assert( ...args: any[] ) : void {} // does nothing
	public error( ...args: any[] ) : void {} // does nothing
	public group( ...args: any[] ) : void {} // does nothing;
	public groupEnd( ...args: any[] ) : void {} // does nothing
	public info( ...args: any[] ) : void {} // does nothing
	public log( ...args: any[] ) : void {} // does nothing
	public warn( ...args: any[] ) : void {} // does nothing

}